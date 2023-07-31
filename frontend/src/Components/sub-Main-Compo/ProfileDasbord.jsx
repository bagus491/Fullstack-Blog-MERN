import { Container,Button } from "react-bootstrap"
import '../../Sass/main.css'
import { useEffect, useState } from "react"
import {useNavigate, useParams} from 'react-router-dom'
import {Spinner} from 'react-bootstrap'
import { ModalCard } from "../Reusebale/ModalCard"

export const ProfileDasbord = () => {
    const [getContentText , setgetContentText] = useState()
    const [getSpinner, setgetSpinner] = useState()
    const [Show , setShow] = useState(false)
    const getToken = localStorage.getItem('uL_')
    const Navigate = useNavigate()
    const {Username} = useParams()

    const handleClose = () => setShow(false)
    const handleOpen = () => setShow(true)
    useEffect(() => {
        const getData = async () => {
            try{
                const respone = await fetch(`http://localhost:5000/profile/${Username}`, {
                    method: 'GET',
                    headers: {
                        'Authorization' : getToken
                    }
                })

                if(!respone.ok){
                    Navigate('*')
                }

                setTimeout(() => {
                    setgetSpinner(true)
                },1000)

                if(respone.status !== 200){
                    setgetContentText(false)
                    return false
                }

                const json = await respone.json()
        
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
                <h2>Welcome Dasbord {Username}</h2>
                {
                    getContentText ? 
                    <div>
                    </div> 
                    :
                     <div className="text-center">
                        <Button onClick={() => handleOpen()}>AddProfile</Button>
                        <ModalCard show={Show} handleClose={handleClose}/>
                    </div>
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