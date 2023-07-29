import { Container,Card,Button } from "react-bootstrap"
import {useNavigate} from 'react-router-dom'
import '../../Sass/main.css'

import PictAvatar from '../../Assets/Images/fun-3d.png'
import { useState } from "react"

export const CardRegister = () =>{
    const Navigate = useNavigate()
    const [Username, setUsername] = useState('')
    const [Password, setPassword] = useState('')
    const [Email, setEmail] = useState('')
    const [getMsg, setgetMsg] = useState()
    const [getAnim ,setgetAnim] = useState()

    const doRegister = async (e) => {
        e.preventDefault()
        try{
                const Formdata = new URLSearchParams()
                    Formdata.append('Username',Username)
                    Formdata.append('Password',Password)
                    Formdata.append('Email',Email)
            const respone = await fetch('http://localhost:5000/register', {
                method: 'post',
                body: Formdata,
            })
            if(respone.ok){
                const json = await respone.json()
                if(respone.status === 201){
                    alert(json.msg)
                    setgetAnim(true)
                    setTimeout(() => {
                        Navigate('/login')
                    },2000)
                }else{
                    setgetMsg(json)
                    setTimeout(() => {
                        document.location.reload()
                    },2000)
                }
        
            }
        }catch{
            console.error({msg : 'ERROR'})
        }
    }



    return(
        <>
        <Container className="cardCompo">
            <div className="parent-card">
        <Card style={{ width: '18rem' }}>
      <Card.Body>
        {
            getMsg ? <ul>
               {
                getMsg.map((e) => (
                    <li key={e.msg}>{e.msg}</li>
                ))
               } 
            </ul>
                    :  <div className={getAnim ? 'card-Avatar-Anim' :'card-Avatar'}>
                    <div className="card-img">
                     <img src={PictAvatar} alt="foto"></img>
                    </div>
                       </div>
        }
        <Card.Subtitle className="mb-2 text-muted">Register</Card.Subtitle>
        <form onSubmit={doRegister}>
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
            <div className="form-box">
                <label>Email</label>
                <input type="email"
                 name="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
                ></input>
            </div>
            <br></br>
            <Button type="submit" variant="secondary">Register</Button>
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