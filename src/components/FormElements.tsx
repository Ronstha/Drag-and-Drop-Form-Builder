import { IconType } from "react-icons/lib";
import { TextFieldFormElement } from "./fields/TextField";
import { TItleFieldFormElement } from "./fields/TitleField";
import { SubTitleElementField } from "./fields/SubtTitleField";
import { ParagrphFieldFormElement } from "./fields/ParagraphField";
import { SeperatorFieldFormElement } from "./fields/SeperatorField";
import { SpacerFieldFormElement } from "./fields/SpacerField";
import { NumberFieldFormElement } from "./fields/NumberField";
import { TextAreaFieldFormElement } from "./fields/TextAreaField";
import { DateFieldFormElement } from "./fields/DateField";
import { SelectFieldFormElement } from "./fields/SelectField";
import { CheckboxFieldFormElement } from "./fields/CheckboxField";

export type ElementsType = "TextField" |
    "TitleField" | 
    "SubTitleField" |
     "ParagraphField" |
      "SeperatorField" |
       "SpacerField"|
       "NumberField"|
       "TextAreaField"|
       "DateField"|"SelectField"|
       "CheckboxField";
export type SubmitFunction = (key: string, value: string) => void;

export type FormElement = {
    type: ElementsType;
    designerBtnElement: {
        icon: IconType;
        label: string;
    };
    designerComponent: React.FC<{
        elementInstance: FormElementInstance
    }>;
    formComponent: React.FC<{
        elementInstance: FormElementInstance;
        submitValue?: SubmitFunction;
        isInvalid?: boolean;
        defaultValue?: string;
    }>;
    propertiesComponent: React.FC<{
        elementInstance: FormElementInstance
    }>;
    construct: (id: string) => FormElementInstance;
    validate: (FormElement: FormElementInstance, currentValue: string) => boolean;
}
export type FormElementInstance = {
    id: string;
    type: ElementsType;
    extraAttributes?: Record<string, any>;
}
type FormElementsType = {
    [key in ElementsType]: FormElement;
}
export const FormElements: FormElementsType = {
    TextField: TextFieldFormElement,
    TitleField: TItleFieldFormElement,
    SubTitleField: SubTitleElementField,
    ParagraphField: ParagrphFieldFormElement,
    SeperatorField: SeperatorFieldFormElement,
    SpacerField: SpacerFieldFormElement,
    NumberField:NumberFieldFormElement,
    TextAreaField:TextAreaFieldFormElement,
    DateField:DateFieldFormElement,
    SelectField:SelectFieldFormElement,
    CheckboxField:CheckboxFieldFormElement
};