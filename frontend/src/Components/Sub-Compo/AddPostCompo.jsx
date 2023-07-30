import { useEffect, useState } from "react"
import {Spinner} from 'react-bootstrap'
import {Navigation} from '../Reusebale/Navigation'
import { useNavigate, useParams } from "react-router-dom"

export const AddPostCompo = () => {
    const [getSpinner, setgetSpinner] = useState(false)
    const getToken = localStorage.getItem('uL_')
    const {Username} = useParams()
    const Navigate = useNavigate()
    useEffect(() => {
       const getData = async () => {
        try{
            const respone = await fetch(`http://localhost:5000/addpost/${Username}`,{
                method: 'GET',
                headers: {
                    'Authorization': getToken
                }
            })
            if(respone.ok){
                if(respone.status === 200){
                    setTimeout(() => {
                        setgetSpinner(true)
                    },1000)
                }
            }else{    
                    Navigate('*')
            }
        }catch{
            console.error({msg: 'Error'})
        }
       }
       getData()
    },[getToken,Username,Navigate])
    return(
        <>
      {
        getSpinner ? 
        <div>
            <Navigation />
        </div>   
        : 
        <div className="spinner-HomeCompo">
        <Spinner animation="grow" variant="info" />
        </div>
      }
        </>
    )
}