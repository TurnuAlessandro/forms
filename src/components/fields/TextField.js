import { useField, ErrorMessage } from "formik"
import { v4 as uuidv } from 'uuid'

export default function TextField({ label, className, ...props }){
    const [field, meta] = useField(props)

    const fieldId = `field${uuidv()}`

    return (
        <div className={'mb-2 field-container ' + className}>
            <label htmlFor={fieldId} >{label}</label>
            <input
                className={`form-control shadow-none ${meta.touched && meta.error ? 'is-invalid': ''}`}
                {...field} {...props}
                id={fieldId}
                autoComplete='off'
            />
            <ErrorMessage
                component='div'
                className='text-danger error-message'
                name={field.name}/>
        </div>
    )
}