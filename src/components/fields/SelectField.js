import { useField, ErrorMessage } from "formik"
import { v4 as uuidv } from 'uuid'

export default function SelectField({ label, placeholder, options, className, ...props }){
    const [field, meta] = useField(props)

    const fieldId = `field${uuidv()}`

    if(!options || options.length === 0){
        console.warn(`The select field with name -${field.name}- and label -${label}- has no options`)
        return null
    }

    let htmlOptions = []


    if(placeholder){
        const firstOption = options[0] // get first element
        htmlOptions.push(
            <option
                key={uuidv()}
                value={firstOption.value}
                style={{color: 'grey'}}
                disabled>
                {firstOption.label}
            </option>
        )
    }

    let optionsCopy = placeholder ? options.slice(1, options.length) : options

    optionsCopy.forEach(option => htmlOptions.push(
        <option
            key={uuidv()}
            value={option.value}>
            {option.label}
        </option>
    ))

    return (
        <div className={'mb-2 field-container ' + className}>
            <label htmlFor={fieldId} >{label}</label>
            <select
                className={`form-select shadow-none m-0 ${meta.touched && meta.error ? 'is-invalid': ''}`}
                {...field} {...props}
                id={fieldId}
                style={meta.value === 'placeholder' ? {color: 'rgba(0,0,0,0.6)'} : null}
                >
                {htmlOptions}
            </select>
            <ErrorMessage
                component='div'
                className='text-danger error-message'
                name={field.name}/>
        </div>
    )
}