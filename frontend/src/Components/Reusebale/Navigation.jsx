import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import '../../Sass/main.css'

export const Navigation = () => {
    return(
        <>
        <Navbar expand="lg">
      <Container>
        <Navbar.Brand href="#" style={{fontFamily: 'cursive',color: 'white',fontSize: '25px'}}>YoursBlog</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll"  style={{background: 'white'}}/>
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#action1" className='text-white'>Home</Nav.Link>          
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
            <Button className='CreateAccountButton' variant='light'>CreateAccount</Button>
            <Button variant='secondary' className='loginbutton'>Login</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
        </>
    )
}