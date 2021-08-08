import { useField } from "formik"
import { v4 as uuidv } from 'uuid'

export default function CheckboxField({ label, ...props }){
    const [field] = useField(props)

    const fieldId = `field${uuidv()}`

    return (
        <div className='mb-2 field-container form-check px-0'>

            <label
                htmlFor={fieldId}
                className='form-check-label float-start ml-0'
            >{label}</label>

            <input
                className='form-check-input float-start mx-2'
                {...field} {...props}
                id={fieldId}
                checked={field.value}
                type="checkbox"/>

        </div>
    )
}