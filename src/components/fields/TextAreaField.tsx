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
import { BsTextareaResize } from "react-icons/bs"
import { Textarea } from "../ui/textarea"
import { Slider } from "../ui/slider"

const type: ElementsType = "TextAreaField"
const extraAttributes = {
    label: "TextArea Field",
    helperText: "Helper Text",
    required: false,
    placeHolder: "Value Here....",
    rows:3
}
const propertiesSchema = z.object({
    label: z.string().min(2).max(50),
    helperText: z.string().max(200),
    required: z.boolean(),
    placeHolder: z.string().max(50),
    rows:z.number().min(1).max(30)
})
type propertiesFormSchemaType = z.infer<typeof propertiesSchema>
export const TextAreaFieldFormElement: FormElement = {
    type,
    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,
    designerBtnElement: {
        icon: BsTextareaResize,
        label: "TextArea Field"
    },
    construct: (id: string) => ({
        id,
        type,
        extraAttributes
    }),
    validate:(formElement:FormElementInstance, currentValue:string):boolean=>{
        const element=formElement as CustomInstance;
        if(element.extraAttributes.required){
            return currentValue.length>0;
        }
        return true
    }

}

type CustomInstance = FormElementInstance & {
    extraAttributes: typeof extraAttributes
}

function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
    const element = elementInstance as CustomInstance;
    const { label, required, placeHolder, helperText,rows } = element.extraAttributes
    return (
        <div className="flex flex-col w-full gap-2">
            <Label>

                {
                    label
                }
                {required && "*"}
            </Label>
            <Textarea rows={rows} readOnly placeholder={placeHolder}></Textarea>
            {helperText && <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>}

        </div>
    )

}
function FormComponent({ elementInstance,submitValue,isInvalid,defaultValue}: { elementInstance: FormElementInstance,submitValue?:SubmitFunction,isInvalid?:boolean,defaultValue?:string}) {
    const element = elementInstance as CustomInstance;
    const { label, required, placeHolder, helperText,rows} = element.extraAttributes
    const [value,setValue]=useState(defaultValue)
    const [error,setError]=useState(false)

    useEffect(()=>{
        setError(isInvalid==true);
    },[isInvalid])
    return (
        <div className="flex flex-col w-full gap-2">
            <Label className={cn(error&&'text-red-500')}>

                {
                    label
                }
                {required && "*"}
            </Label>
            <Textarea rows={rows} className={cn(error&&'border-red-500')}  placeholder={placeHolder} onChange={e=>setValue(e.target.value)} onBlur={(e)=>{
                if(!submitValue) return
                const valid=TextAreaFieldFormElement.validate(element,e.target.value);
                setError(!valid);
                if(!valid) return;
                submitValue(element.id,e.target.value)
            }} value={value}></Textarea>
            {helperText && <p className={cn("text-muted-foreground text-[0.8rem]",error && 'text-red-500')}>{helperText}</p>}

        </div>
    )

}

function PropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
    const element = elementInstance as CustomInstance;
    const { updateElement } = useDesigner()
    const { label, helperText, placeHolder, required,rows} = element.extraAttributes
    const form = useForm<propertiesFormSchemaType>({
        resolver: zodResolver(propertiesSchema),
        mode: "onBlur",
        defaultValues: {
            label,
            helperText,
            placeHolder,
            required,
            rows
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
                helperText: values.helperText,
                rows:values.rows
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
            <FormField
                control={form.control}
                name="rows"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Rows {form.watch('rows')}</FormLabel>
                        <FormControl>
                        <Slider defaultValue={[field.value]} step={1} min={1} max={30} onValueChange={(value)=>{
                            field.onChange(value[0])
                        }}/>
                        </FormControl>
                        <FormDescription>
                            The helper text of the field. <br/> It will be displayed below the field
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />

        </form>

    </Form>
}

