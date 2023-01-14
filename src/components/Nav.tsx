import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import oreo from '../assets/images/oreo.jpg';
import { Link } from 'react-router-dom';
import '../styles/nav.css';


function NavigationBar() {
  return (
    <Navbar bg="light" expand="lg">
      <Container >
      <Image src={oreo} className='oreoClass'></Image>
        <Navbar.Brand href="#home">The Corgi Fetcher</Navbar.Brand>
        <Nav.Link href='/'><Button variant="primary">Home</Button>{' '}</Nav.Link>
        <Nav.Link href='/login'><Button variant="info">Login</Button>{' '}</Nav.Link>
        <Nav.Link href='/'><Button variant="danger">Logout</Button>{' '}</Nav.Link>
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