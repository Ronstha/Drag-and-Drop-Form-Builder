import { FaIcons } from "react-icons/fa"
import { AlertDialog, AlertDialogTrigger,AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogHeader, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "./ui/alert-dialog"
import { Button } from "./ui/button"
import { MdOutlinePublish } from 'react-icons/md'
import { useTransition } from "react"
import { toast } from "sonner"
import { PublishForm } from "@/actions/form"
import { useRouter } from "next/navigation"
const PublishFormBtn=({id}:{id:number})=>{
    const router=useRouter()
    const [loading,startTransition]=useTransition()
    const publishForm=async()=>{
        try{
            await PublishForm(id)
            toast.success("Success",{description:"Your form is available to public"})
            router.refresh();
            
        }catch(err){
            toast.error('Something went wrong')

        }

    }
    return <AlertDialog>
        <AlertDialogTrigger asChild>

    <Button variant={'outline'} className="gap-2 text-white bg-gradient-to-r from-indigo-400 to-cyan-400">

        <MdOutlinePublish className="h-4 w-4"/>

        Publish
    </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>

            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone. After publishing you won't be able to edit this form
                <br/><br/>
                <span className="font-medium">
                    By Publishing this form you will make it available to the public and you will be able to collect submissons

                </span>
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction disabled={loading} onClick={e=>{e.preventDefault();startTransition(publishForm)}}>Proceed {loading && <FaIcons className="animate-spin"/>}</AlertDialogAction>
            </AlertDialogFooter>
            

        </AlertDialogContent>
    </AlertDialog>

}


export default PublishFormBtn