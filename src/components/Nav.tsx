import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import oreo from '../assets/images/oreo.jpg';
import '../styles/nav.css';
import { useState } from 'react';
import { auth } from '../config/firebase';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


function NavigationBar() {
  const navigate = useNavigate();

  const [user, loading, error] = useAuthState(auth);

  const signUserOut = async () => {
    await signOut(auth);
    navigate('/');
  }

  return (
    <Navbar bg='light' expand="lg">
      <Container >
        <Image src={oreo} className='oreoClass'></Image>
        <p>{user?.displayName}</p>
        <Image src={user?.photoURL || ''} style={{ marginRight: '4vw', borderRadius: '25px' }} />
        <Navbar.Brand>Corgi Board</Navbar.Brand>
        <Nav.Link href='/'><Button variant="primary">Home</Button>{' '}</Nav.Link>{' '}
        {!user && <Button onClick={() => { navigate('/login') }} variant="info">Login</Button>}{' '}
        {user && <Button onClick={() => { navigate('/createpost') }} variant="dark">Post +</Button>}{' '}
        {user && <Button onClick={signUserOut} variant="danger">Logout</Button>}{' '}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;