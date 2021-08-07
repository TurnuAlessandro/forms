import 'bootstrap/dist/css/bootstrap.min.css'
import CustomForm from './components/Form'

function App() {
    return (
        <div
            className='container mt-3'>
            <div
                className='row'>
                <div className='col-md-7'>
                    <CustomForm />
                </div>
                <div className='col-md-5'>
                    Image
                </div>


            </div>
        </div>
    )
}

export default App
