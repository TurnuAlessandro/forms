import React, {forwardRef, useState} from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import it from 'date-fns/locale/it'

import "react-datepicker/dist/react-datepicker.css"
import { range } from 'd3'
import {ErrorMessage, useField} from "formik"
import {v4 as uuidv} from "uuid"


export default function DateField({
                                      label,
                                      className,
                                      onFormikChange,
                                      onFormikBlur,
                                      ...props}){

    const [field, meta] = useField(props)
    const fieldId = `field${uuidv()}`

    const [gg, mm, aa] = field.value.split('/')

    console.log('field', field)
    console.log('meta', meta)

    const [startDate, setStartDate] = useState(new Date(parseInt(aa), parseInt(mm)-1, parseInt(gg)))
    const years = range(1990, (new Date()).getFullYear() + 1, 1)
    const months = [
        "Gennaio",
        "Febbraio",
        "Marzo",
        "Aprile",
        "Maggio",
        "Giugno",
        "Luglio",
        "Agosto",
        "Settembre",
        "Ottobre",
        "Novembre",
        "Dicembre",
    ]

    registerLocale('it', it)


    const CustomInput = forwardRef(({ value, onClick, onChange, onBlur }, ref) => {
        return (


            <input
                key={uuidv()}
                className={`form-control shadow-none ${meta.touched && meta.error ? 'is-invalid': ''}`}
                {...field} {...props}
                value={value}
                id={fieldId}
                ref={ref}
                onClick={onClick}
                onBlur={onBlur}
                autoComplete='off'
                type='date'
                contentEditable={false}
            />
        )
    })

    return (
        <div className={'mb-2 field-container ' + className} key={uuidv()}>
            <label htmlFor={fieldId} >{label}</label>
            <DatePicker
                dateFormat="dd/MM/yyyy"
                onBlur={() => onFormikBlur()}
                renderCustomHeader={({
                                         date,
                                         changeYear,
                                         changeMonth,
                                         decreaseMonth,
                                         increaseMonth,
                                         prevMonthButtonDisabled,
                                         nextMonthButtonDisabled,
                                     }) => (
                    <div className="input-group" style={{transform: 'scale(.7)'}}>
                        <div className="input-group-prepend">
                            <button className="btn btn-secondary rounded-0" type="button"
                                    onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>{'<'}</button>
                        </div>
                        <select className="form-select custom-select" id="inputDatePickerYear"
                                value={date.getFullYear()}
                                onChange={({ target: { value } }) => changeYear(value)}
                                aria-label="Example select with button addon">
                            {years.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                        <select
                            className="form-select custom-select" id="inputDatePickerMonth"
                            value={months[date.getMonth()]}
                            onChange={({ target: { value } }) =>
                                changeMonth(months.indexOf(value))
                            }
                        >
                            {months.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                        <div className="input-group-append">
                            <button
                                className="btn btn-secondary rounded-0" type="button"
                                onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                                {">"}
                            </button>
                        </div>
                    </div>
                )}
                selected={startDate}
                locale='it'
                onBlur={onFormikBlur}
                onChange={(date) => {

                    setStartDate(date)
                    //console.log('onChange', date, `${date.getDate()}/${date.getUTCMonth()+1}/${date.getUTCFullYear()}`)

                    let [gg, mm, aa] = [date.getDate(), date.getUTCMonth()+1, date.getUTCFullYear()]
                    gg = gg.toString().length === 1 ? '0'+gg : gg
                    mm = mm.toString().length === 1 ? '0'+mm : mm
                    onFormikChange(`${gg}/${mm}/${aa}`)
                }}
                className={'aaaaaa'}
                customInput={<CustomInput />}
                fixedHeight
            />

            <ErrorMessage
                component='div'
                className='text-danger error-message'
                name={field.name}/>
        </div>
    );
};

export {
    DateField
}