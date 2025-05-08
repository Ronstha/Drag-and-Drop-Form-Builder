import { getForms, GetFromStats } from "@/actions/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ReactNode, Suspense } from "react";
import { LuView } from "react-icons/lu"
import { FaEdit, FaWpforms } from "react-icons/fa"
import { HiCursorClick } from "react-icons/hi"
import { TbArrowBounce } from "react-icons/tb"
import { BiRightArrowAlt } from "react-icons/bi"
import { Separator } from "@/components/ui/separator";
import { CreateFormButton } from "@/components/create-form-button";
import { Form } from "@/generated/prisma";
import { Badge } from "@/components/ui/badge";
import { formatDistance } from "date-fns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function Home() {
  return (
    <div className="container pt-4 mx-10 sm:mx-auto">
      <Suspense fallback={<StatsCard loading={true} />}>
        <CardStatsWrapper />
      </Suspense>
      <Separator className="my-6" />
      <h2 className="text-4xl font-bold col-span-2">Your Forms</h2>
      <Separator className="my-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CreateFormButton />
        <Suspense fallback={[1,2,3,4].map(k=><FormCardSkeleton key={k}/>)}>
          <FormCards/>
        </Suspense>
      </div>
    </div>
  );
}

async function CardStatsWrapper() {
  const stats = await GetFromStats()
  return <StatsCard loading={false} data={stats} />;

}
interface StatsCardProps {
  data?: Awaited<ReturnType<typeof GetFromStats>>;
  loading: boolean;
}
function StatsCard(props: StatsCardProps) {
  const { data, loading } = props;

  return (
    <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Visits"
        icon={<LuView className="text-blue-600" />}
        helperText="All time form visits"
        value={data?.visits.toLocaleString() || ""}
        loading={loading}
        className="shadow-md shadow-blue-600"
      />
      <StatCard
        title="Total Submissons"
        icon={<FaWpforms className="text-yellow-600" />}
        helperText="All time form Submissons"
        value={data?.submissons.toLocaleString() || ""}
        loading={loading}
        className="shadow-md shadow-yellow-600"
      />
      <StatCard
        title="Submisson Rate"
        icon={<HiCursorClick className="text-green-600" />}
        helperText="Visits that results in form submissons"
        value={data?.submissonRate.toLocaleString() || ""}
        loading={loading}
        className="shadow-md shadow-green-600"
      />
      <StatCard
        title="Bounce Rate"
        icon={<TbArrowBounce className="text-red-600" />}
        helperText="Visits that leaves without interacting"
        value={data?.bounceRate.toLocaleString() || ""}
        loading={loading}
        className="shadow-md shadow-red-600"
      />

    </div>
  )
}

interface cardProps {
  title: string;
  value: string;
  helperText: string;
  className: string;
  icon: ReactNode;
  loading: boolean;


}
export function StatCard({ title, value, helperText, loading, className, icon }: cardProps) {
  return <Card className={className}>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{
        loading ? <Skeleton><span className="text-transparent">0</span></Skeleton> : value}</div>
      <p className="text-xs text-muted-foreground pt-1">{helperText}</p>
    </CardContent>
  </Card>

}

function FormCardSkeleton(){
return  <Skeleton className="border-2 border-primary/20 h-[190px] w-full"/>
}
async  function FormCards(){
  const forms=await getForms();
  return <>
  {
    forms.map(form=>(
      <FormCard key={form.id}  form={form}/>
    ))
  }
  </>

}

interface FormCardProps{
 form:Form
}

function FormCard({form}:FormCardProps){
  return <Card className="">
    <CardHeader>
      <CardTitle className="flex items-center gap-2 justify-between">
        <span className="truncate font-bold">{form.name}</span>
        {
          form.published ? <Badge>Published</Badge>:
          <Badge variant={'destructive'}>Draft</Badge>
        }
      </CardTitle>
<CardDescription className="flex items-center justify-between text-muted-foreground text-sm">
  {
    formatDistance(form.createdAt,new Date(),{addSuffix:true})
  }
  {
    form.published && 
    <span className="flex items-center gap-2">
    <LuView className="text-muted-foreground"/>
    <span>{form.visits.toLocaleString()}</span>
    <FaWpforms className="text-muted-foreground"/>
    <span>{form.submissons.toLocaleString()}</span>
    </span>
  }
</CardDescription>
    </CardHeader>
    <CardContent className="h-[20px] truncate text-sm text-muted-foreground">
        {form.description || "No Description"}
    </CardContent>
<CardFooter>
  {form.published ? (
    <Button asChild className="w-full mt-2 text-md gap-4">
      <Link href={`/forms/${form.id}`}>View Submissons <BiRightArrowAlt/></Link>
    </Button>
  ):
  (
<Button asChild className="w-full mt-2 text-md gap-4">
      <Link href={`/builder/${form.id}`}>Edit Form <FaEdit/></Link>
    </Button>

  )}
</CardFooter>

  </Card>

}