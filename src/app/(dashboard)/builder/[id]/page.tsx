import { GetFormById } from "@/actions/form";
import FormBuilder from "@/components/FormBuilder";

export default async function Page({params}:{params:{id:string}}){
    const {id}=await params;
    const form=await GetFormById(Number(id))
    if(!form){
        throw new Error("Form not found")
    }
    return <FormBuilder form={form}/>

    
}