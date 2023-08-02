import { Container,Spinner,Button,Form} from "react-bootstrap"
import '../../Sass/main.css'
import { useEffect, useState } from "react"
import {useNavigate, useParams} from 'react-router-dom'

export const AddPostForm = () => {
    const [getSpinner, setgetSpinner] = useState(false)
    const [Title, setTitle] = useState('')
    const [Preparagraf , setPreparagraf] = useState('')
    const [Paragraf, setParagraf] = useState('')
    const [Author, setAuthor] = useState('')
    const [Poster, setPoster] = useState()
    const getToken = localStorage.getItem('uL_')
    const {Username} = useParams()
    const Navigate  = useNavigate()

    const AddNewPost = async (e) => {
        e.preventDefault()
        const formData = new FormData()
            formData.append('Title',Title)
            formData.append('Preparagraf',Preparagraf)
            formData.append('Paragraf',Paragraf)
            formData.append('Author',Author)
            formData.append('Poster',Poster[0])
        try{
            const respone = await fetch(`http://localhost:5000/addpost/${Username}`, {
                method: 'post',
                body: formData,
                headers: {
                    'Authorization': getToken
                }
            })

            if(!respone.ok){
                Navigate('*')
            }

            const json = await respone.json()
            alert(json.msg)
            document.location.reload()
        }catch{
            console.error({msg : 'Error'})
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setgetSpinner(true)
        },1000)

        if(Preparagraf.length >= 70){
            alert('max Prepagraf 70 word')
        }
    },[getToken,Username,Navigate,Preparagraf])
    return(
        <>
        <Container>
            {
                getSpinner ?  
                <div>
                    <h2 className="text-center">AddPost</h2>
                        <div className="myform-bg">
                        <form onSubmit={AddNewPost}> 
                            {/* Title */}
                        <div className="myform-addpost">
                            <div className="col-span">
                            <label>Title:</label>
                            </div>
                            <div className="col-spantwo">
                            <Form.Control
                            type="text"
                            name="Title"
                            className="me-2"
                            placeholder="Title"
                            onChange={(e) => setTitle(e.target.value)}
                            required
                           />
                            </div>                          
                        </div>

                        <div className="myform-addpost">
                            <div className="col-span">
                            <label>PrePragraf:</label>
                            </div>
                            <div className="col-spantwo">
                            <Form.Control
                            type="text"
                            name="Preparagraf"
                            className='me-2'
                            placeholder="Preparagraf"
                            onChange={(e) => setPreparagraf(e.target.value)}
                            required
                            maxLength={70}
                           />
                            </div>                          
                        </div>

                        <div className="myform-addpost">
                            <div className="col-span">
                            <label>Paragraf:</label>
                            </div>
                            <div className="col-spantwo">
                            <textarea 
                             name="Paragraf"
                             onChange={(e) => setParagraf(e.target.value)}
                             required
                            ></textarea>
                            </div>                          
                        </div>

                        <div className="myform-addpost">
                            <div className="col-span">
                            <label>Author:</label>
                            </div>
                            <div className="col-spantwo">
                            <Form.Control
                            type="text"
                            name="Author"
                            className="me-2"
                            placeholder="Author"
                            onChange={(e) => setAuthor(e.target.value)}
                            required
                           />
                            </div>                          
                        </div>

                        <div className="myform-addpost">
                            <div className="col-span">
                            <label>Poster:</label>
                            </div>
                            <div className="col-spantwo">
                            <input type="file" 
                             name="Poster"
                             onChange={(e) => setPoster(e.target.files)}
                             required
                            ></input>
                            </div>                          
                        </div>
                        <br></br>
                        <div className="myfrom-addpost-button text-center">
                        <Button type="submit">
                            submit
                        </Button>
                        </div>
                        </form>

                        </div> 
                </div>
                 :  
                <div className="spinner-HomeCompo">
                <Spinner animation="grow" variant="info" />
                </div>
            }

        </Container>
        </>
    )
}