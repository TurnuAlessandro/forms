import { Formik, Form as FormikForm } from "formik"
import TextField from "./fields/TextField"
import TextAreaField from "./fields/TextAreaField"
import SelectField from "./fields/SelectField"
import CheckboxField from "./fields/CheckboxField"
import * as Yup from 'yup'
import React from 'react'
import Modal from 'react-bootstrap/Modal'
import './form-styles.css'

export function ModalProva({ progetto, ...props }) {
    


    /*
            nome,
            descrizione,
            importo,
            dataInizio,
            dataFine,
            stato,
            attivo,
            idComune,
            idArea

    */

    const comuniOptions = [
        {label: 'scegli comune...', value: 'placeholder', valid: false},
        {label: 'Cagliari', value: 'idCagliari', valid: true},
        {label: 'Uta', value: 'idUta', valid: true},
        {label: 'Serramanna', value: 'idSerramanna', valid: true},
        {label: 'Amo', value: 'idAmo', valid: true},
        {label: 'Quartu', value: 'idQuartu', valid: true},
    ]

    const select2options = [
        {label: 'scegli valore...', value: 'placeholder', valid: false},
        {label: 'Uno', value: '1', valid: true},
        {label: 'Due', value: '2', valid: true},
        {label: 'Tre', value: '3', valid: true},
        {label: 'Quattro', value: '4', valid: true},
        {label: 'Cinque', value: '5', valid: true},
        {label: 'Sei', value: '6', valid: true},
        {label: 'Sette', value: '7', valid: true},
        {label: 'Otto', value: '8', valid: true},
        {label: 'Nove', value: '9', valid: true},
        {label: 'Dieci', value: '10', valid: true},
    ]

    const validator = Yup.object({
        titolo: Yup.string().max(15, 'Il titolo deve avere 10 caratteri o meno').required('Campo Obbligatorio'),
        descrizione: Yup
            .string()
            .min(3, 'Il comune deve essere essere lungo almeno 3 caratteri')
            .max(20, 'Il comune non può essere più lunga di 20 caratteri')
            .required('Campo Obbligatorio'),
        comune: Yup
            .string()
            .oneOf(comuniOptions.filter(c => c.valid).map(c => c.value), 'Campo Obbligatorio')
            .required('Campo Obbligatorio'),

        selectArea2: Yup
            .string()
            .oneOf(select2options.filter(c => c.valid).map(c => c.value), 'Campo Obbligatorio')
            .required('Campo Obbligatorio'),
        email: Yup.string().email('La mail non è valida').required('Campo Obbligatorio')
    })

    return(
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Formik
                enableReinitialize={true}
                initialValues={{
                    titolo: '',
                    descrizione: '',
                    comune: 'placeholder',
                    selectArea2: 'placeholder',
                    email: '',
                    attivo: false
                }}
                validationSchema={validator}
                onSubmit={values => {
                    console.log('You submitted the form')
                    console.log('Submit Form with these values: ',values)
                }}
                onReset={values => {
                    console.log('You resetted the form')
                }}>
                {formik => {
                    return (
                            <FormikForm>
                                <fieldset className='form-group'>
                                    <Modal.Header closeButton>
                                        <Modal.Title id="contained-modal-title-vcenter">
                                            <legend>{progetto ? "Modifica Progetto" : 'Nuovo Progetto'}</legend>
                                        </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <TextField
                                            label='Titolo'
                                            name='titolo'
                                            placeholder='inserisci titolo...'
                                            type='text'/>
                                        <SelectField
                                            label='Comune'
                                            name='comune'
                                            options={comuniOptions}
                                            placeholder={true}/>
                                        <SelectField
                                            label='Select2'
                                            name='selectArea2'
                                            options={select2options}
                                            placeholder={true}/>
                                        <TextField
                                            label='Email'
                                            name='email'
                                            placeholder='inserisci email...'
                                            type='email'/>
                                        <TextAreaField
                                            label='Descrizione'
                                            name='descrizione'
                                            placeholder='inserisci descrizione...'
                                            type='text'/>
                                        <CheckboxField
                                            label='Attivo'
                                            name='attivo'/>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <button
                                            className='btn btn-outline-danger mx-1'
                                            style={{borderRadius: 0}}
                                            type='reset'>Reset</button>
                                        <button
                                            className='btn btn-success mx-1'
                                            style={{borderRadius: 0}}
                                            type='submit'>{progetto ? 'Modifica' : 'Invia'}</button>
                                    </Modal.Footer>
                                </fieldset>
                            </FormikForm>
                    )
                }}
            </Formik>

        </Modal>
    )
}
