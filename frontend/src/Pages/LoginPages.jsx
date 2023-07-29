
import { useEffect, useState } from "react"
import { Spinner } from "react-bootstrap"
import '../Sass/main.css'
import { CardLogin } from "../Components/Sub-Compo/CardLogin"
import {useNavigate} from 'react-router-dom'

export const LoginPages = () => {
    const [getSpinner , setSpinner] = useState(true)
    const getToken = localStorage.getItem('uL_')
    const Navigate = useNavigate()

    useEffect(() => {
       const getData = async () => {
        try{
            const respone = await fetch('http://localhost:5000/login', {
                method: 'GET',
                headers: {
                    'Authorization' : getToken
                }
            })
            if(respone.ok){
                const json = await respone.json()
              if(respone.status === 200) {
                Navigate(`/dasbord/${json.Username}`)
              }
            }else {
                setTimeout(() => {
                    setSpinner(false)
                },1000)
            }
             
        }catch{
            console.error({msg : 'Error'})
        }
       }
       getData()
    },[getToken,Navigate])


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