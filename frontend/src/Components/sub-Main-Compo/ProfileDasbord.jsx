import { Container } from "react-bootstrap"
import '../../Sass/main.css'
import { useState } from "react"

export const ProfileDasbord = () => {
    const [getContentText , setgetContentText] = useState(false)
    return(
        <>
       <Container>
        <div className="mybgProfile">
        {
            getContentText ? <h1>tester</h1>  : <h1>tester aja</h1>
        }
        </div>
       </Container>
        </>
    )
}