"use client"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import {Form,FormControl,FormDescription,FormField,FormItem,FormLabel,FormMessage} from './ui/form'

import {zodResolver} from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import {ImSpinner2} from 'react-icons/im'
import {BsFileEarmarkPlus} from 'react-icons/bs'
import { toast } from "sonner"
import { formSchema, formSchemaType } from "@/schemas/form"
import { createForm } from "@/actions/form"
import { useRouter } from "next/navigation"



export const CreateFormButton=()=>{
    const router=useRouter()
    const form=useForm<formSchemaType>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            name:'',
            description:""
        }
    })
    const onSubmit=async(values:formSchemaType)=>{
        try{
            const formId=await createForm(values)
            toast.success("Sucess",{description:"Form Created Successfully"})
            router.push(`/builder/${formId}`)
        }catch(err){
            toast.error("Error",{description:"Unexpected Error Occured",style:{backgroundColor:'red'}})

        }
    }
       return <Dialog>
        <DialogTrigger asChild>
            <Button variant={"outline"} className="group border border-primary/20 h-[210px] items-center justify-center flex flex-col hover:border-primary hover:cursor-pointer border-dashed gap-4">
            <BsFileEarmarkPlus className="h-8 w-8 text-muted-foreground group-hover:text-primary"/>
            <p className="font-bold text-xl text-muted-foreground group-hover:text-primary"> Create new Form</p>
           </Button>
        </DialogTrigger>
        <DialogContent>
        <DialogHeader>
            <DialogTitle>
                Create Form
                <DialogDescription>
                    Create a new form to start collecting responses
                </DialogDescription>
            </DialogTitle>
        </DialogHeader>
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField control={form.control} name="name" render={({field})=>(
                <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                        <Input {...field}/>
                    </FormControl>

                </FormItem>
            )}/>
            <FormField control={form.control} name="description" render={({field})=>(
                <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                        <Textarea {...field}/>
                    </FormControl>

                </FormItem>
            )}/>
        </form>
    </Form>
    <DialogFooter>
        <Button onClick={form.handleSubmit(onSubmit)} disabled={form.formState.isSubmitting} className="w-full mt-4">
            {!form.formState.isSubmitting ? <span>Save</span>: <ImSpinner2 className="animate-spin"/>}
        </Button>

    </DialogFooter>
  

        </DialogContent>
       </Dialog>
}