import { Container,Spinner,Button} from "react-bootstrap"
import '../../Sass/main.css'
import { useEffect, useState } from "react"


export const AddPostForm = () => {
    const [getSpinner, setgetSpinner] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setgetSpinner(true)
        },1000)
    },[])
    return(
        <>
        <Container>
            {
                getSpinner ?  
                <div>
                    <h2 className="text-center">AddPost</h2>
                        <div className="myform-bg">
                        <form>
                            {/* Title */}
                        <div className="myform-addpost">
                            <div className="col-span">
                            <label>Title:</label>
                            </div>
                            <div className="col-spantwo">
                            <input type="text"></input>
                            </div>                          
                        </div>

                        <div className="myform-addpost">
                            <div className="col-span">
                            <label>PrePragraf:</label>
                            </div>
                            <div className="col-spantwo">
                            <input type="text"></input>
                            </div>                          
                        </div>

                        <div className="myform-addpost">
                            <div className="col-span">
                            <label>Paragraf:</label>
                            </div>
                            <div className="col-spantwo">
                            <textarea></textarea>
                            </div>                          
                        </div>

                        <div className="myform-addpost">
                            <div className="col-span">
                            <label>Author:</label>
                            </div>
                            <div className="col-spantwo">
                            <input type="text"></input>
                            </div>                          
                        </div>

                        <div className="myform-addpost">
                            <div className="col-span">
                            <label>Poster:</label>
                            </div>
                            <div className="col-spantwo">
                            <input type="file"></input>
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