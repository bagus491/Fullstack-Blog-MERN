import { Container } from "react-bootstrap"
import '../../Sass/main.css'
import { useEffect, useState } from "react"
import {useNavigate, useParams} from 'react-router-dom'
import {Spinner} from 'react-bootstrap'

export const ProfileDasbord = () => {
    const [getContentText , setgetContentText] = useState()
    const [getSpinner, setgetSpinner] = useState()
    const getToken = localStorage.getItem('uL_')
    const Navigate = useNavigate()
    const {Username} = useParams()
    useEffect(() => {
        const getData = async () => {
            try{
                const respone = await fetch(`http://localhost:5000/profile/${Username}`, {
                    method: 'GET',
                    headers: {
                        'Authorization' : getToken
                    }
                })

              if(respone.ok){
                  setTimeout(() => {
                      setgetSpinner(true)
                  },1000)
                if(respone.status === 200){
                    const json = await respone.json()
                    
                }else{
                    console.log('kwkwk')
                }
              }else{
                Navigate('*')
              }
            }catch{
                console.error({msg : 'Error'})
            }
        }
        getData()
    },[Username,Navigate,getToken])
    return(
        <>
       <Container>
        <div className="mybgProfile">
        {
            getSpinner ? 
            <div>
                {
                    getContentText ? <h1>tester aja</h1>  : <h1>tester</h1>
                }
            </div>: 
            <div className="spinner-HomeCompo">
        <Spinner animation="grow" variant="info" />
        </div>
        }
        </div>
       </Container>
        </>
    )
}