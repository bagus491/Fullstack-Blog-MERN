
import { useEffect, useState } from "react"
import { Spinner } from "react-bootstrap"
import '../Sass/main.css'
import { CardLogin } from "../Components/Sub-Compo/CardLogin"

export const LoginPages = () => {
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
        </div> : <CardLogin />
           }
        </div>
    )
}