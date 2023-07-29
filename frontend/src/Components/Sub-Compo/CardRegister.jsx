import { Container,Card,Button } from "react-bootstrap"
import {useNavigate} from 'react-router-dom'
import '../../Sass/main.css'

import PictAvatar from '../../Assets/Images/fun-3d.png'

export const CardRegister = () =>{
    const Navigate = useNavigate()

    return(
        <>
        <Container className="cardCompo">
            <div className="parent-card">
        <Card style={{ width: '18rem' }}>
      <Card.Body>
       <div className="card-Avatar">
       <div className="card-img">
        <img src={PictAvatar} alt="foto"></img>
       </div>
       </div>
        <Card.Subtitle className="mb-2 text-muted">Register</Card.Subtitle>
        <form>
            <div className="form-box">
                <label>Username</label>
                <input type="text"></input>
            </div>
            <div className="form-box">
                <label>Password</label>
                <input type="password"></input>
            </div>
            <div className="form-box">
                <label>Email</label>
                <input type="email"></input>
            </div>
            <br></br>
            <Button variant="secondary">Register</Button>
        </form>
        <div className="button-card-two">
        <Button onClick={() => Navigate('/')}>&laquo; Home</Button>
        <Button variant="info" onClick={() => Navigate('/login')}>Login</Button>
        </div>
      </Card.Body>
         </Card>
            </div>
        </Container>
        </>
    )
}