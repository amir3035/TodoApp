import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import ProfileIcon from './profileIcon';
import logo from '../constant/task-management-logo.png'

function header() {
    let pos={
        // position:"sticky",
        // top:"0",
        width:"100%",
        }
  return (
    <>
      <Navbar className='navbar fixed-top' bg="light" data-bs-theme="light" style={pos}>
        <Container>
          <Navbar.Brand to="/home" style={{color:"orange"}}>
          <img
            src={logo}
            alt="Happy Tasking!!!"
            style={{
                  marginLeft:'40px',
                  width: '70px',
                  height: '50px',
                  borderRadius: '30%',
                  cursor: 'pointer'
  
              }}
            className="profile-image"
          />
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/dashboard">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">about</Nav.Link>
          </Nav>
        </Container>
        <Nav>
        <ProfileIcon callBack={true}></ProfileIcon>
        </Nav>
      </Navbar>
    </>
  );
}

export default header;