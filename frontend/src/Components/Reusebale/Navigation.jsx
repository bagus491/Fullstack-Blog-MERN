import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import {useNavigate}  from 'react-router-dom'
import '../../Sass/main.css'
import { useEffect, useState } from 'react';

export const Navigation = () => {
    const Navigate = useNavigate()
    const getToken = localStorage.getItem('uL_')
    const [changeNav, setchangeNav] = useState(true)

    function deleteCookie(name) {
      // Mengatur kembali cookie dengan waktu kedaluwarsa yang telah berlalu
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }

    const doLogout = async () => {
      try{
        const respone = await fetch('http://localhost:5000/logout', {
          method :'GET',
          headers : {
            'Authorization': getToken
          }
        })
        if(respone.ok){
          const json = await respone.json()
          alert(json.msg)
          Navigate('/login')
          deleteCookie('Ui')
          localStorage.clear()
        }else{
          console.error({msg : 'Error'})
        }
      }catch{
        console.error({msg : 'Error'})
      }
    }

    useEffect(() => {
      if(getToken){
        setchangeNav(false)
      }else {
        setchangeNav(true)
      }
    },[getToken])

    return(
        <>
        <Navbar expand="lg" className='bg-dark'>
      <Container>
        <Navbar.Brand href="#" style={{fontFamily: 'cursive',color: 'white',fontSize: '25px'}}>YoursBlog</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll"  style={{background: 'white'}}/>
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          > 
          {
            changeNav ?    <Nav.Link href="#action1" className='text-white'>Home</Nav.Link>  
            :
            <div style={{display: 'flex'}}>
                <Nav.Link href="#action1" className='text-white'>Home</Nav.Link>      
                <Nav.Link href="#action1" className='text-white'>Addpost</Nav.Link> 
                <Nav.Link href="#action1" className='text-white'>ListPosts</Nav.Link>           
            </div>
          }
              
          </Nav>
          {
            changeNav ? 
            <div style={{display: 'flex'}}> 
              <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-info">Search</Button>
          </Form>
            <Button className='CreateAccountButton' variant='light' onClick={() => Navigate('/register')}>CreateAccount</Button>
            <Button variant='info' className='loginbutton' onClick={() => Navigate('/login')}>Login</Button></div>
            :
            <div>
             <Button className='CreateAccountButton' variant='light' onClick={() => Navigate('/settings')}>Settings</Button>
            <Button variant='info' className='loginbutton' onClick={() => doLogout()}>Logout</Button>
            </div>
          }
         
        </Navbar.Collapse>
      </Container>
    </Navbar>
        </>
    )
}