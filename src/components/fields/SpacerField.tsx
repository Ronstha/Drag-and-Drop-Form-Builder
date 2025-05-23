"use client"

import { ElementsType, FormElement, FormElementInstance } from "../FormElements"
import { Label } from "../ui/label"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import useDesigner from "../hooks/useDesigner"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { LuSeparatorHorizontal } from "react-icons/lu"
import { Slider } from "../ui/slider"

const type: ElementsType = "SpacerField"
const extraAttributes = {
    height:20,
 
}
const propertiesSchema = z.object({
    height: z.number().min(5).max(100)
})
type propertiesFormSchemaType = z.infer<typeof propertiesSchema>
export const SpacerFieldFormElement: FormElement = {
    type,
    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,
    designerBtnElement: {
        icon: LuSeparatorHorizontal,
        label: "Spacer Field"
    },
    construct: (id: string) => ({
        id,
        type,
        extraAttributes
    }),
    validate:()=>true

}

type CustomInstance = FormElementInstance & {
    extraAttributes: typeof extraAttributes
}

function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
    const element = elementInstance as CustomInstance;
    const { height} = element.extraAttributes
    return (
        <div className="flex flex-col w-full gap-2">
            <Label className="text-muted-foreground">

              Spacer Field: {height}px
            </Label>
           <LuSeparatorHorizontal className="h-8 w-8"/>

        </div>
    )

}
function FormComponent({ elementInstance}: { elementInstance: FormElementInstance}) {
    const element = elementInstance as CustomInstance;
    const {height } = element.extraAttributes
   
    return (
   <div style={{height,width:"100%"}}>

   </div>
    )

}

function PropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
   
    const element = elementInstance as CustomInstance;
    const { updateElement } = useDesigner()
    const { height } = element.extraAttributes
    const form = useForm<propertiesFormSchemaType>({
        resolver: zodResolver(propertiesSchema),
        mode: "onBlur",
        defaultValues: {
        height
        }
    })
    useEffect(() => {
        form.reset(element.extraAttributes);
    }, [element, form])

    function applyChanges(values: propertiesFormSchemaType) {
        updateElement(element.id, {
            ...element,
            extraAttributes: {
               height:values.height
            }
        })
    }

    return <Form {...form}>
        <form onBlur={form.handleSubmit(applyChanges)} onSubmit={e => e.preventDefault()} className="space-y-3">
            <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Height (px): {form.watch("height")}</FormLabel>
                        <FormControl className="pt-2">
                            <Slider defaultValue={[field.value]} min={5} max={100} step={1} onValueChange={(value=>{
                                field.onChange(value[0])
                            })}/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
           
        </form>

    </Form>
}

