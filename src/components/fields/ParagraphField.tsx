"use client"

import { ElementsType, FormElement, FormElementInstance, FormElements, SubmitFunction } from "../FormElements"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import useDesigner from "../hooks/useDesigner"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { BsTextParagraph } from "react-icons/bs"
import { Textarea } from "../ui/textarea"
import { Label } from "../ui/label"

const type: ElementsType = "ParagraphField"
const extraAttributes = {
    text:"Text here"
 
}
const propertiesSchema = z.object({
    text: z.string().min(2).max(500),
})
type propertiesFormSchemaType = z.infer<typeof propertiesSchema>
export const ParagrphFieldFormElement: FormElement = {
    type,
    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,
    designerBtnElement: {
        icon: BsTextParagraph,
        label: "Paragraph Field"
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
    const { text} = element.extraAttributes
    return (
        <div className="flex flex-col w-full gap-2">
            <Label className="text-muted-foreground">

              Paragraph Field
            </Label>
            <p >{text}</p>

        </div>
    )

}
function FormComponent({ elementInstance}: { elementInstance: FormElementInstance}) {
    const element = elementInstance as CustomInstance;
    const {text } = element.extraAttributes
   
    return (
   <p >{text}</p>
    )

}

function PropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
   
    const element = elementInstance as CustomInstance;
    const { updateElement } = useDesigner()
    const { text } = element.extraAttributes
    const form = useForm<propertiesFormSchemaType>({
        resolver: zodResolver(propertiesSchema),
        mode: "onBlur",
        defaultValues: {
        text
        }
    })
    useEffect(() => {
        form.reset(element.extraAttributes);
    }, [element, form])

    function applyChanges(values: propertiesFormSchemaType) {
        updateElement(element.id, {
            ...element,
            extraAttributes: {
               text:values.text
            }
        })
    }

    return <Form {...form}>
        <form onBlur={form.handleSubmit(applyChanges)} onSubmit={e => e.preventDefault()} className="space-y-3">
            <FormField
                control={form.control}
                name="text"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Text</FormLabel>
                        <FormControl>
                            <Textarea {...field}
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

