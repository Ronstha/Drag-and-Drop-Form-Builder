import { updateFromContent } from "@/actions/form"
import useDesigner from "./hooks/useDesigner"
import { Button } from "./ui/button"
import { HiSaveAs } from 'react-icons/hi'
import { toast } from "sonner"
import { useTransition } from "react"
import { FaSpinner } from "react-icons/fa"
const SaveFormBtn=({id}:{id:number})=>{

    const {elements}=useDesigner()
    const [loading,startTransition]=useTransition()
    const updateFormContent=async()=>{
        try{
            const JsonElements=JSON.stringify(elements)
            await updateFromContent(id,JsonElements)
            toast.success("Your Form Has been Saved")
            
        }catch(err){
            toast.error("Something went wrng")

        }
    }
    return <Button variant={'outline'} className="gap-2" disabled={loading} onClick={()=>{
        startTransition(updateFormContent)
    }}>
        <HiSaveAs className="h-4 w-4"/>
        Save
{loading && <FaSpinner className="animate-spin"/>}
    </Button>

}


export default SaveFormBtn