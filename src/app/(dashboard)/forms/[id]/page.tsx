import { GetFormById, GetFormWithSubmissons } from "@/actions/form";
import FormLinkShare from "@/components/FormLinkShare";
import VisitBtn from "@/components/VisitBtn";
import { StatCard } from "../../page";
import { LuView } from "react-icons/lu"
import { FaWpforms } from "react-icons/fa"
import { HiCursorClick } from "react-icons/hi"
import { TbArrowBounce } from "react-icons/tb"
import { ElementsType, FormElementInstance } from "@/components/FormElements";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format, formatDistance } from "date-fns";
import { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

export default async function Page({params}:{params:{id:string}}){
    const {id}=await params;
    const form=await GetFormById(Number(id))
    const {submissons,visits}=form;
    let submissonRate = 0;
    if (submissonRate > 0) {
        submissonRate = (submissons / visits) * 100;

    }
    const bounceRate = 100 - submissonRate

    if(!form){
        throw new Error("Form not found")
    }
    return <><div className="py-10  border-b border-muted">
        <div className="flex justify-between container">
            <h1 className="text-4xl font-bold truncate">{form.name}</h1>
            <VisitBtn shareUrl={form.shareUrl}/>

            </div>
            <div className="py-4 border-b border-muted">
                <div className="container flex gap-2 items-center justify-between">

                <FormLinkShare shareUrl={form.shareUrl}/>
                </div>
            </div>
            </div>
            <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 container">
                <StatCard
                        title="Total Visits"
                        icon={<LuView className="text-blue-600" />}
                        helperText="All time form visits"
                        value={visits.toLocaleString() || ""}
                        loading={false}
                        className="shadow-md shadow-blue-600"
                      />
                      <StatCard
                        title="Total Submissons"
                        icon={<FaWpforms className="text-yellow-600" />}
                        helperText="All time form Submissons"
                        value={submissons.toLocaleString() || ""}
                        loading={false}
                        className="shadow-md shadow-yellow-600"
                      />
                      <StatCard
                        title="Submisson Rate"
                        icon={<HiCursorClick className="text-green-600" />}
                        helperText="Visits that results in form submissons"
                        value={submissonRate.toLocaleString() || ""}
                        loading={false}
                        className="shadow-md shadow-green-600"
                      />
                      <StatCard
                        title="Bounce Rate"
                        icon={<TbArrowBounce className="text-red-600" />}
                        helperText="Visits that leaves without interacting"
                        value={bounceRate.toLocaleString() || ""}
                        loading={false}
                        className="shadow-md shadow-red-600"
                      />

            </div>
            <div className="container pt-10">
                <SubmissonTable id={form.id}/>
            </div>
            </>

    
}

type Row={
  [key:string]:string
} & {submittedAt:Date};

const SubmissonTable=async({id}:{id:number})=>{
  const form=await GetFormWithSubmissons(id);
  if(!form){
    throw new Error("Form not found");
  }
  const formElements=JSON.parse(form.content) as FormElementInstance[];
  const columns:{
    id:string;
    label:string;

    required:boolean;
    type:ElementsType;
  }[]=[];
  formElements.forEach(element=>{
    switch(element.type){
      case "TextField":
      case "NumberField":
      case "TextAreaField":
      case "DateField":
      case "SelectField":
      case "CheckboxField":
        columns.push({
          id:element.id,
          label:element.extraAttributes?.label,
          required:element.extraAttributes?.required,
          type:element.type
        })
        break;
      default:
        break;
    }
  })
 const rows:Row[]=[]
 form.forms.forEach(submisson=>{
  const content= JSON.parse(submisson.content);
  rows.push({
    ...content,
    submittedAt:submisson.createdAt
  })
 })

    return <>
     <h1 className="text-2xl font-bold my-4">Submisons</h1>
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>{columns.map((column)=>(
            <TableHead key={column.id} className="uppercase">
              {column.label}
            </TableHead>
          ))}
          <TableHead className="text-mut text-right uppercase">Submitted At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            rows.map((row,index)=>(
              <TableRow key={index}>
                {columns.map(column=>(
                  <RowCell key={column.id} type={column.type} value={row[column.id]}/>
                ))}
                <TableCell className="text-muted-foreground text-right">
                    {formatDistance(row.submittedAt,new Date(),{addSuffix:true})}
                </TableCell>
              </TableRow>
            ))
          }

        </TableBody>
      </Table>

    </div>
    </>

}

function RowCell({type,value}:{
  type:ElementsType; value:string;
}){
  let node:ReactNode=value;
  switch(type){
    case "DateField":
      const date=new Date(value);
      node=<Badge variant={'outline'}>{format(date,'dd/MM/yyyy')}</Badge>
      break;
    case "CheckboxField":
      const checked=value==="true";
      node=<Checkbox checked={checked} disabled/>
      break;
    default:
      break;
  }
  return <TableCell>{node}</TableCell>

}