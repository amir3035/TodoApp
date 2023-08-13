import { useState } from "react"
import React from 'react';
import axios from 'axios';
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
//import APIConstants from "../constant/baseURL";

const ForgotPassword = () => {
  const [email,setemail]=useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const navigate=useNavigate();

    const handleSubmit=async(e)=>{
      e.preventDefault();
      setIsButtonDisabled(true);
      const jsonData={email:email}
      try {
        const response = await axios.post(
          `/api/todos/forgotPassword`,
          jsonData
        )
       if(response.data){
        confirmAlert({
          message:response.data.message,
          buttons: [    
            {
              label: 'OK',
            },
          ]
        })
          // Re-enable the button after the process is complete
        navigate('/resetpassword');
      }
      } catch (error) {
        if (error.response) {
          setIsButtonDisabled(false);
          const errorMessage = error.response.data.message;
          confirmAlert({
            message:errorMessage,
            buttons: [    
              {
                label: 'OK',
              },
            ]
          })
        } 
}

    }

  return (
    <div>
       <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-3 border-primary"></div>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-uppercase ">forgot Password?</h2>
                  <p className=" mb-5">Please enter your registered email!</p>
                  <div className="mb-3">
                    <Form onSubmit={handleSubmit}> 
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <Form.Control type="email"
                         placeholder="Enter email"
                         value={email}
                         onChange={(e)=>setemail(e.target.value)}
                         required
                         />
                         {/* {error && <h6 style={{color: '#ff4b44'}}>{error}</h6>} */}
                      </Form.Group>                      
                      <div className="d-grid">
                        <Button variant="primary" type="submit" disabled={isButtonDisabled}>
                        {isButtonDisabled ? 'Please wait...' : 'Submit to get OTP'}
                        </Button>
                      </div>
                    </Form>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default ForgotPassword
