import { IconType } from "react-icons/lib";
import { TextFieldFormElement } from "./fields/TextField";

export type ElementsType="TextField";


export type FormElement={
    type:ElementsType;
    designerBtnElement:{
        icon:IconType;
        label:string;
    };
    designerComponent:React.FC<{
        elementInstance:FormElementInstance
    }>;
    formComponent:React.FC;
    propertiesComponent:React.FC;
    construct:(id:string)=>FormElementInstance;
}
export type FormElementInstance={
    id:string;
    type:ElementsType;
    extraAttributes?: Record<string,any>;
}
type FormElementsType={
    [key in ElementsType]: FormElement;
}
export const FormElements: FormElementsType={
    TextField:TextFieldFormElement
};