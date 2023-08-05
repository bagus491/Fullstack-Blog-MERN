import { useEffect, useState } from "react"
import {Spinner} from 'react-bootstrap'
import {Navigation} from '../Reusebale/Navigation'
import { useNavigate, useParams } from "react-router-dom"
import {UpdateBlogForm} from '../sub-Main-Compo/UpdateBlogForm'
export const UpdatePostCompo = () => {
    const [getSpinner, setgetSpinner] = useState(false)
    const getToken = localStorage.getItem('uL_')
    const {Username,id} = useParams()
    const Navigate = useNavigate()
    useEffect(() => {
       const getData = async () => {
        try{
            const respone = await fetch(`http://localhost:5000/updateblog/${Username}/${id}`,{
                method: 'GET',
                headers: {
                    'Authorization': getToken
                }
            })

            if(!respone.ok){
                Navigate('*')
            }

            setTimeout(() => {
                setgetSpinner(true)
            },1000)
        }catch{
            console.error({msg: 'Error'})
        }
       }
       getData()
    },[getToken,Username,Navigate,id])
    return(
        <>
      {
        getSpinner ? 
        <div>
            <Navigation />
            <UpdateBlogForm />
        </div>   
        : 
        <div className="spinner-HomeCompo">
        <Spinner animation="grow" variant="info" />
        </div>
      }
        </>
    )
}