"use client"

import { MdTextFields } from "react-icons/md"
import { ElementsType, FormElement, FormElementInstance } from "../FormElements"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import useDesigner from "../hooks/useDesigner"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Switch } from "../ui/switch"

const type: ElementsType = "TextField"
const extraAttributes = {
    label: "Text Field",
    helperText: "Helper Text",
    required: false,
    placeHolder: "Value Here...."
}
const propertiesSchema = z.object({
    label: z.string().min(2).max(50),
    helperText: z.string().max(200),
    required: z.boolean(),
    placeHolder: z.string().max(50)
})
type propertiesFormSchemaType = z.infer<typeof propertiesSchema>
export const TextFieldFormElement: FormElement = {
    type,
    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,
    designerBtnElement: {
        icon: MdTextFields,
        label: "TextField"
    },
    construct: (id: string) => ({
        id,
        type,
        extraAttributes
    }),

}

type CustomInstance = FormElementInstance & {
    extraAttributes: typeof extraAttributes
}

function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
    const element = elementInstance as CustomInstance;
    const { label, required, placeHolder, helperText } = element.extraAttributes
    return (
        <div className="flex flex-col w-full gap-2">
            <Label>

                {
                    label
                }
                {required && "*"}
            </Label>
            <Input readOnly placeholder={placeHolder}></Input>
            {helperText && <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>}

        </div>
    )

}
function FormComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
    const element = elementInstance as CustomInstance;
    const { label, required, placeHolder, helperText } = element.extraAttributes
    return (
        <div className="flex flex-col w-full gap-2">
            <Label>

                {
                    label
                }
                {required && "*"}
            </Label>
            <Input  placeholder={placeHolder}></Input>
            {helperText && <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>}

        </div>
    )

}

function PropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
    const element = elementInstance as CustomInstance;
    const { updateElement } = useDesigner()
    const { label, helperText, placeHolder, required } = element.extraAttributes
    const form = useForm<propertiesFormSchemaType>({
        resolver: zodResolver(propertiesSchema),
        mode: "onBlur",
        defaultValues: {
            label,
            helperText,
            placeHolder,
            required
        }
    })
    useEffect(() => {
        form.reset(element.extraAttributes);
    }, [element, form])

    function applyChanges(values: propertiesFormSchemaType) {
        updateElement(element.id, {
            ...element,
            extraAttributes: {
                label: values.label,
                placeHolder: values.placeHolder,
                required: values.required,
                helperText: values.helperText
            }
        })
    }

    return <Form {...form}>
        <form onBlur={form.handleSubmit(applyChanges)} onSubmit={e => e.preventDefault()} className="space-y-3">
            <FormField
                control={form.control}
                name="label"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Label</FormLabel>
                        <FormControl>
                            <Input {...field}
                                onKeyDown={(e) => {
                                    if (e.key == 'Enter') e.currentTarget.blur();
                                }}
                            />
                        </FormControl>
                        <FormDescription>
                            The label of the field. <br /> It will be displayed above the field
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="placeHolder"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Placeholder</FormLabel>
                        <FormControl>
                            <Input {...field}
                                onKeyDown={(e) => {
                                    if (e.key == 'Enter') e.currentTarget.blur();
                                }}
                            />
                        </FormControl>
                        <FormDescription>
                            The placeholder  of the field. 
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="helperText"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Helper Text</FormLabel>
                        <FormControl>
                            <Input {...field}
                                onKeyDown={(e) => {
                                    if (e.key == 'Enter') e.currentTarget.blur();
                                }}
                            />
                        </FormControl>
                        <FormDescription>
                            The helper text of the field. <br/> It will be displayed below the field
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="required"
                render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-lg p-3 shadow-sm">
                        <div className="space-y-0.5"></div>
                        <FormLabel>Required</FormLabel>
                        <FormDescription>
                            Is the field required?
                        </FormDescription>
                        <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange}/>
                           
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

        </form>

    </Form>
}

