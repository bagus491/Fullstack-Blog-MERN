import { useEffect, useState } from "react"
import {useNavigate, useParams} from 'react-router-dom'
import { Spinner } from "react-bootstrap"
import {Navigation} from '../Reusebale/Navigation'
import { ProfileDasbord } from "../sub-Main-Compo/ProfileDasbord"

export const DasbordCompo = () => {
    const [getSpinner, setgetSpinner] = useState(false)
    const getToken = localStorage.getItem('uL_')
    const {Username} = useParams()
    const Navigate = useNavigate()
    useEffect(() => {
        const getData = async() => {
            try{
                const respone = await fetch(`http://localhost:5000/dasbord/${Username}`, {
                    method: 'GET',
                    headers: {
                        'Authorization' : getToken
                    }
                })

                if(respone.ok){
                    if(respone.status === 200){
                        setTimeout(() => {
                            setgetSpinner(true)
                        },1000)
                    }else {
                        Navigate('/login')
                    }
                }else {
                    Navigate('*')
                }
            }catch{
                console.log({msg : 'error'})
            }
        }
       getData()
    },[getToken,Navigate,Username])
    return(
        <>
       {
        getSpinner ? 
        <div>
          <Navigation />
          {/* bagian profile disini */}
          <ProfileDasbord />
        </div> :
         <div className="spinner-HomeCompo">
        <Spinner animation="grow" variant="info" />
    </div>
       }
        </>
    )
}