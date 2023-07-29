import { useEffect, useState } from "react"
import { Spinner } from "react-bootstrap"
import '../Sass/main.css'
import { CardRegister } from "../Components/Sub-Compo/CardRegister"

export const RegisterPages = () => {
    const [getSpinner , setSpinner] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setSpinner(false)
        },1000)
    },[])
    return(
        <div>
           {
            getSpinner ?   <div className="spinner-HomeCompo">
            <Spinner animation="grow" variant="info" />
        </div> : <CardRegister />
           }
        </div>
    )
}