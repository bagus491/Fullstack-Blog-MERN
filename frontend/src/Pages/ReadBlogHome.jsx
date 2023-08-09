
import { useEffect, useState } from "react"
import { Navigation } from "../Components/Reusebale/Navigation"
import { Spinner,Container} from 'react-bootstrap'
import { useParams } from "react-router-dom"

import '../Sass/main.css'

export const ReadBlogHome = () => {
    const [getSpinner, setgetSpiner] = useState(false)
    const [getContent, setgetContent] = useState()
    const {id} = useParams()
    useEffect(() => {
        const getData = async () => {
            try{
                const respone = await fetch(`http://localhost:5000/homeread/${id}`, {
                    method: 'GET'
                })
                
                if(!respone.ok){
                    console.error({msg : 'Error'})
                    return false
                }

                const valueResp = await respone.json()
                setgetContent(valueResp.data)
                setgetSpiner(true)
            }catch(error) {
                console.error({msg: 'Error'})
            }
        }
        getData()
    },[id])
    return(
        <>
        <Navigation />
        {
            getSpinner ? 
           <Container style={{marginTop: '50px', display: 'flex' , textAlign: 'center', justifyContent: 'center'}}>
           {
            getContent ?   
            getContent.map((e) => (
              <div key={e.Title}>
                <h1>{e.Title}</h1>
                <img src={e.ImagePath} alt="foto" style={{width: '50%'}}></img>
                <p style={{fontSize: '10px'}}>{e.PostDate}</p>
                <br></br>
                <p>{e.Paragraf}</p>
              </div>
            ))  : <h1>No Content</h1>
           } 
           
           </Container>
            : 
            <div className="spinner-HomeCompo">
                <Spinner animation="grow" variant="info" />
            </div>
        }
        </>
    )
}