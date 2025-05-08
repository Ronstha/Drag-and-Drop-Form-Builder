import { GetFormById } from "@/actions/form";
import FormLinkShare from "@/components/FormLinkShare";
import VisitBtn from "@/components/VisitBtn";
import { StatCard } from "../../page";
import { LuView } from "react-icons/lu"
import { FaWpforms } from "react-icons/fa"
import { HiCursorClick } from "react-icons/hi"
import { TbArrowBounce } from "react-icons/tb"

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

const SubmissonTable=({id}:{id:number})=>{
    return <></>

}