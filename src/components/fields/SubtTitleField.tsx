"use client"

import { MdTextFields } from "react-icons/md"
import { ElementsType, FormElement, FormElementInstance, FormElements, SubmitFunction } from "../FormElements"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import useDesigner from "../hooks/useDesigner"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Switch } from "../ui/switch"
import { cn } from "@/lib/utils"
import { LuHeading1, LuHeading2 } from "react-icons/lu"

const type: ElementsType = "SubTitleField"
const extraAttributes = {
    title: "Subtitle Field",
 
}
const propertiesSchema = z.object({
    title: z.string().min(2).max(50),
})
type propertiesFormSchemaType = z.infer<typeof propertiesSchema>
export const SubTitleElementField: FormElement = {
    type,
    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,
    designerBtnElement: {
        icon: LuHeading2,
        label: "SubTitle Field"
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
    const { title} = element.extraAttributes
    return (
        <div className="flex flex-col w-full gap-2">
            <Label className="text-muted-foreground">

              Title Field
            </Label>
            <p className="text-md">{title}</p>

        </div>
    )

}
function FormComponent({ elementInstance}: { elementInstance: FormElementInstance}) {
    const element = elementInstance as CustomInstance;
    const {title } = element.extraAttributes
   
    return (
   <p className="text-md">{title}</p>
    )

}

function PropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
   
    const element = elementInstance as CustomInstance;
    const { updateElement } = useDesigner()
    const { title } = element.extraAttributes
    const form = useForm<propertiesFormSchemaType>({
        resolver: zodResolver(propertiesSchema),
        mode: "onBlur",
        defaultValues: {
        title
        }
    })
    useEffect(() => {
        form.reset(element.extraAttributes);
    }, [element, form])

    function applyChanges(values: propertiesFormSchemaType) {
        updateElement(element.id, {
            ...element,
            extraAttributes: {
               title:values.title
            }
        })
    }

    return <Form {...form}>
        <form onBlur={form.handleSubmit(applyChanges)} onSubmit={e => e.preventDefault()} className="space-y-3">
            <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>SubTitle</FormLabel>
                        <FormControl>
                            <Input {...field}
                                onKeyDown={(e) => {
                                    if (e.key == 'Enter') e.currentTarget.blur();
                                }}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
           
        </form>

    </Form>
}

