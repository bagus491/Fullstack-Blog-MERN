
import { useEffect, useState } from "react"
import { Navigation } from "../Reusebale/Navigation"
import { Spinner,Card,Button,Container} from 'react-bootstrap'
import { useNavigate } from "react-router-dom"

import '../../Sass/main.css'

export const HomeCompo = () => {
    const [getSpinner, setgetSpiner] = useState(false)
    const [getContent, setgetContent] = useState()
    const Navigate = useNavigate()
    useEffect(() => {
        const getData = async () => {
            try{
                const respone = await fetch('http://localhost:5000/home', {
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
    },[])
    return(
        <>
        <Navigation />
        {
            getSpinner ? 
           <Container style={{marginTop: '50px', display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
           {
            getContent ?   
            getContent.map((e) => (
                <Card style={{ width: '50%', marginBottom: '20px', marginLeft: '2px' }} key={e._id}>
                <Card.Img variant="top" src={e.ImagePath} />
                <Card.Body>
                  <Card.Title>{e.Title}</Card.Title>
                  <Card.Text>
                  {e.Preparagraf}
                  </Card.Text>
                  <Button variant="primary" onClick={() => Navigate(`/readblog/${e._id}`)}>ReadBlog</Button>
                  <Button variant="secondary" style={{marginLeft: '5px'}}>{e.Author}</Button>
                </Card.Body>
              </Card>
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