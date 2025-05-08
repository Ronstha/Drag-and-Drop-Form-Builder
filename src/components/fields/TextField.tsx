"use client"

import { MdTextFields } from "react-icons/md"
import { ElementsType, FormElement, FormElementInstance } from "../FormElements"
import { Label } from "../ui/label"
import { Input } from "../ui/input"

const type:ElementsType="TextField"
const extraAttributes={
    label:"Text Field",
    helperText:"Helper Text",
    required:false,
    placeHolder:"Value Here...."
}
export const TextFieldFormElement:FormElement={
    type,
    designerComponent:DesignerComponent,
    formComponent:()=><div>DesignerComponent</div>,
    propertiesComponent:()=><div>DesignerComponent</div>,
    designerBtnElement:{
        icon: MdTextFields,
        label:"TextField"
    },
    construct:(id:string)=>({
        id,
        type,
        extraAttributes
    }),

}

type CustomInstance=FormElementInstance & {
    extraAttributes: typeof extraAttributes
}

function DesignerComponent ({elementInstance}:{elementInstance:FormElementInstance}){
    const element= elementInstance as CustomInstance;
    const {label,required,placeHolder,helperText}=element.extraAttributes
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