import { Container,Card,Button } from "react-bootstrap"
import {useNavigate} from 'react-router-dom'
import '../../Sass/main.css'

import PictAvatar from '../../Assets/Images/fun-3d.png'
import { useState } from "react"

export const CardLogin = () =>{
    const Navigate = useNavigate()
    const [Username, setUsername] = useState('')
    const [Password, setPassword] = useState('')
    const [getAnim, setgetAnim] = useState()

    const doLogin = async (e) => {
        e.preventDefault()
        try{
            const FormData = new URLSearchParams()
                FormData.append('Username',Username)
                FormData.append('Password',Password)
            const respone = await fetch('http://localhost:5000/login', {
                method: 'post',
                body: FormData,
            })
            if(respone.ok){
                const json = await respone.json()
                if(respone.status === 200){
                    // fix dari sini
                    console.log(json)
                    setgetAnim(true)
                }
            }
        }catch{
            console.error({msg : 'error'})
        }
    }

    return(
        <>
        <Container className="cardCompo">
            <div className="parent-card">
        <Card style={{ width: '18rem' }}>
      <Card.Body>
       <div className={getAnim ? 'card-Avatar-Anim' : 'card-Avatar'}>
       <div className="card-img">
        <img src={PictAvatar} alt="foto"></img>
       </div>
       </div>
        <Card.Subtitle className="mb-2 text-muted">Login</Card.Subtitle>
        <form onSubmit={doLogin}>
            <div className="form-box">
                <label>Username</label>
                <input type="text"
                name="Username"
                onChange={(e) => setUsername(e.target.value)}
                required
                ></input>
            </div>
            <div className="form-box">
                <label>Password</label>
                <input type="password" 
                  name="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                ></input>
            </div>
            <br></br>
            <Button type="submit"  variant="secondary">Login</Button>
        </form>
        <div className="button-card-two">
        <Button onClick={() => Navigate('/')}>&laquo; Home</Button>
        <Button variant="info" onClick={() => Navigate('/register')}>Register</Button>
        </div>
      </Card.Body>
         </Card>
            </div>
        </Container>
        </>
    )
}