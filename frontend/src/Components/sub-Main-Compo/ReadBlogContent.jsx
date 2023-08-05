import { useState,useEffect } from "react"
import {useParams, useNavigate} from 'react-router-dom'
import {Container, Spinner} from 'react-bootstrap'
import '../../Sass/main.css'


export const ReadBlogContent = () => {
    const [getSpinner , setgetSpinner] = useState(false)
    const [getContent , setgetContent] = useState()
    const [getPost, setgetPost] = useState()
    const getToken = localStorage.getItem('uL_')
    const {Username,id} = useParams()
    const Navigate = useNavigate()

    useEffect(() => {
        const getData = async () => {
            try{
                const respone = await fetch(`http://localhost:5000/getblog/${Username}/${id}`,{
                    method: 'GET',
                    headers: {
                        'Authorization': getToken
                    }
                })

                if(!respone.ok){
                    Navigate('*')
                    return false
                }

                if(respone.status !== 200){
                    setgetContent(false)
                    return false
                }

                const json = await respone.json()
                //dataArray
                const jsonArray = json.data
                setgetContent(true)
                setgetPost(jsonArray)
                setgetSpinner(true)
            }catch{
                console.error({msg : 'Error'})
            }
        }
        getData()
    },[getToken,Navigate,Username,id])
    return(
        <>
        {
            getSpinner ?  
            <div>
                {
                    getContent ?  
                    <Container>
                     {
                        getPost ? getPost.map((e) => (
                           <div key={e.Title} className="myreadblog-bg">
                            <h1>{e.Title}</h1>
                            <img src={e.ImagePath} alt="foto"></img>
                            <h6>{e.PostDate}</h6>
                            <p>{e.Paragraf}</p>
                           </div>
                        ))  : <p></p>
                     }
                    </Container>
                    : 
                    <div className="text-center"> <h1>didnt Found Posts</h1></div>
                }
            </div>
             : 
                <div className="spinner-HomeCompo">
                <Spinner animation="grow" variant="info" />
                </div>
        }
        </>
    )
}