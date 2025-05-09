"use client"

import { ElementsType, FormElement, FormElementInstance, FormElements, SubmitFunction } from "../FormElements"
import { Label } from "../ui/label"

import { z } from "zod"
import {RiSeparator} from 'react-icons/ri'
import { Separator } from "../ui/separator"

const type: ElementsType = "SeperatorField"

const propertiesSchema = z.object({
    title: z.string().min(2).max(50),
})
type propertiesFormSchemaType = z.infer<typeof propertiesSchema>
export const SeperatorFieldFormElement: FormElement = {
    type,
    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,
    designerBtnElement: {
        icon: RiSeparator,
        label: "Seperator Field"
    },
    construct: (id: string) => ({
        id,
        type,
    }),
    validate:()=>true

}



function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
   
    return (
        <div className="flex flex-col w-full gap-2">
            <Label className="text-muted-foreground">

              Seperator Field
            </Label>
<Separator/>           

        </div>
    )

}
function FormComponent({ elementInstance}: { elementInstance: FormElementInstance}) {

    return (
   <Separator/>
    )

}

function PropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
   
    return <p>No properties for this element</p>
}

