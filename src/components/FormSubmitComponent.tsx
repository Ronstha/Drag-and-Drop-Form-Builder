"use client"
import React, { useRef, useState, useTransition } from 'react'
import { FormElementInstance, FormElements } from './FormElements'
import { Button } from './ui/button'
import { HiCursorClick } from 'react-icons/hi'
import { toast } from 'sonner'
import { ImSpinner2 } from 'react-icons/im'
import { SubmitForm } from '@/actions/form'

const FormSubmitComponent = ({ formUrl, content }: {
    formUrl: string,
    content: FormElementInstance[]
}) => {
    const [renderKey, setRenderKey] = useState(new Date().getTime())
    const formValues = useRef<{ [key: string]: string }>({})
    const formErrors = useRef<{ [key: string]: boolean }>({})
    const [submitted, setSubmitted] = useState(false)
    const [pending, startTransition] = useTransition()
    const validateForm: () => boolean = () => {
        for (const field of content) {
            const actualValue = formValues.current[field.id] || "";
            const valid = FormElements[field.type].validate(field, actualValue);
            if (!valid) {
                formErrors.current[field.id] = true;

            }

        }
        if (Object.keys(formErrors.current).length > 0) return false;
        return true;


    }
    const submitValue = (key: string, value: string) => {
        formValues.current[key] = value

    }
    const submitForm = async () => {
        formErrors.current = {};
        const valid = validateForm();
        if (!valid) {
            setRenderKey(new Date().getTime())
            toast.error("Error", { description: 'Please check the form for errors' })
            return
        }
        try {
            const JsonContent = JSON.stringify(formValues.current)
            await SubmitForm(formUrl, JsonContent)
            setSubmitted(true)

        } catch (err) {
            toast.error("Error", { description: 'Something went wrong' })

        }
    }
    if (submitted) {
        return <div className='flex justify-center w-full h-full items-center p-8'>
            <div className='max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-blue-700 rounded'>
                <h1 className='text-2xl font-bold'>
                    Form Submitted
                </h1>
                <p className='text-muted-foreground'>Thank you for submmitng the form, You can close this page now</p>


            </div>
        </div>
    }
    return (
        <div className='flex justify-center w-full h-full items-center p-8'>
            <div key={renderKey} className='max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-blue-700 rounded'>
                {
                    content.map((element) => {
                        const FormElement = FormElements[element.type].formComponent;
                        return <FormElement key={element.id} elementInstance={element} submitValue={submitValue} isInvalid={formErrors.current[element.id]} defaultValue={formValues.current[element.id]??""} />
                    })
                }
                <Button className='mt-8' onClick={() => { startTransition(submitForm) }}>
                    {
                        pending ? <ImSpinner2 className='animate-spin' /> : <>
                            <HiCursorClick className='mr-2' /> Submit
                        </>
                    }


                </Button>
            </div>
        </div>

    )
}

export default FormSubmitComponent