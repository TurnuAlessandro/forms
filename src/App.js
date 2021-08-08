import 'bootstrap/dist/css/bootstrap.min.css'
import ManageProjectModalForm from "./components/Form";
import React from 'react'
import Modal from 'react-modal'
import { ModalProva } from "./components/ModalProva";

function App() {
    const [isManageProjectModalFormOpen, setIsManageProjectModalFormOpen] = React.useState(false)

    const closeModal = () => setIsManageProjectModalFormOpen(false)


    return (
        <div
            className='container mt-3'>
            <button onClick={() => setIsManageProjectModalFormOpen(true)}>Open modal</button>
            <div
                className='row'>
                <div className='col-md-7'>
                    <ManageProjectModalForm />
                </div>
                <div className='col-md-5'>
                    Image
                </div>


            </div>

            <ModalProva onHide={() => setIsManageProjectModalFormOpen(false)}
                        progetto={{

                        }}
                           show={isManageProjectModalFormOpen}
                           />
        </div>
    )
}

export default App
