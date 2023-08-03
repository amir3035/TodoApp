import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
//import { Link } from 'react-router-dom';

function header() {
    let pos={
        // position:"sticky",
        // top:"0",
        width:"100%",
        }
  return (
    <>
      <Navbar className='navbar fixed-top' bg="dark" data-bs-theme="dark" style={pos}>
        <Container>
          <Navbar.Brand to="/home">My Todos App</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">about</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
    // <Link to="/">Home</Link>
  );
}

export default header;