import { useState } from "react"
import React from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { Link,useNavigate } from 'react-router-dom';


const LoginForm=()=>{

    const navigate = useNavigate();
    const [email,setemail]=useState('');
    const [password,setpassword]=useState('');
    // const [error,seterror]=useState()

    // function isValidEmail(email) {
    //     return /\S+@\S+\.\S+/.test(email);
    //   }

      const handleChange = event => {
        // if (!isValidEmail(event.target.value)) {
        //   seterror('email is invalid');
        // } else {
        //   seterror(null);
        // }
    
        setemail(event.target.value);
      };
const handleSubmit=async(e)=>{
    e.preventDefault();
    const jsonData = {email:email,password:password};

    try {
        // Replace 'https://jsonplaceholder.typicode.com' with your own backend API endpoint
        const response = await axios.post(
          '/api/todos/login',
          jsonData
        );
        // Assuming the API returns a token upon successful login
        const token = response.data.accessToken;
        // Store the token in the local storage
        localStorage.setItem('token', token);
        navigate('/dashboard');
      } catch (error) {
        if (error.response) {
          // If the server responded with an error status code (e.g., 404 or 401)
          const errorMessage = error.response.data.message;
          alert(errorMessage); // Show the error message as an alert
          // You can also update the state to display the error message in the UI
          // setErrorMessage(errorMessage);
        } else {
          // If the request didn't reach the server (e.g., network error)
          // Handle network or other errors
          alert('An error occurred. Please try again later.');
        }
}
}

return(
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-3 border-primary"></div>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-uppercase ">welcome!</h2>
                  <p className=" mb-5">Please enter your login and password!</p>
                  <div className="mb-3">
                    <Form onSubmit={handleSubmit}> 
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <Form.Control type="email"
                         placeholder="Enter email"
                         value={email}
                         onChange={handleChange}
                         required
                         />
                         {/* {error && <h6 style={{color: '#ff4b44'}}>{error}</h6>} */}
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password"
                        autoComplete="current-password"
                        placeholder="Password" 
                        value={password}
                        onChange={(e)=>setpassword(e.target.value)}
                        required
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      >
                        <p className="small">
                          <a className="text-primary" href="#!">
                            Forgot password?
                          </a>
                        </p>
                      </Form.Group>
                      <div className="d-grid">
                        <Button variant="primary" type="submit">
                          Login
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-primary fw-bold">
                          Sign Up</Link>
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default LoginForm;