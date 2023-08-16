import { useState } from "react"
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import APIConstants from "../constant/baseURL";

const Register = () => {

    const navigate = useNavigate();
    let [userdata,setuserdata]=useState({
        first_name:'',
        last_name:'',
        email:'',
        password:'',
        confirmpassword:'',
        phone_Number:'',
        image:null,

    })

    const handleChange=(e)=>{
        const { name, value } = e.target;
        setuserdata((prevData) => ({
          ...prevData,
          [name]: value,
        }));

    }
    // useEffect(() => {
    //     // This will log the updated userdata state whenever it changes
    //     console.log('userdata', userdata);
    //   }, [userdata]);
    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        console.log(selectedImage,"selectedImage")
        // Check if a file was selected
        if (!selectedImage) {
          return;
        }
    
        // Check if the selected file is an image
        if (!selectedImage.type.startsWith('image/')) {
          alert('Please select an image file.');
          return;
        }
    
        // Update the 'image' field in userdata with the selected image file
        console.log(selectedImage,'selectedImage')
        setuserdata({ ...userdata, image: selectedImage });
        console.log('userdata',userdata)
      };
    const handleSubmit=async (e)=>{
      if(userdata.password !== userdata.confirmpassword){
      confirmAlert({
        message:'Password does not match',
        buttons: [
          {
            label: 'OK',
          },
        ]
      })
  }else{
     e.preventDefault();
     try{
        const formData = new FormData();

    // Append the userdata fields to the FormData
    formData.append('email', userdata.email);
    formData.append('first_name', userdata.first_name);
    formData.append('last_name', userdata.last_name);
    formData.append('password', userdata.password);
    formData.append('phone_Number', userdata.phone_Number);

    // Append the image file to the FormData
    formData.append('image', userdata.image);
     const responce=await axios.post(`/api/todos/createuser`,formData)
     const token = responce.data.accessToken;
     await localStorage.setItem('token',token);
     navigate('/dashboard')
     }
     catch(error){
        if(error.response){
            const errmess=await error.response.data.message;
            //alert(errmess)
            confirmAlert({
              message:errmess,
              buttons: [
      
                {
                  label: 'OK',
                },
              ]
            })
        }
        else{
          confirmAlert({
            title:'Confirm to submit',
            message:'Something went wrong ',
            buttons: [
              {
                label: 'OK',
                //onClick: () => alert('Click No')
              }
            ]
          })
        }
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
                  <h2 className="fw-bold mb-2 text-uppercase ">welcome!</h2>
                  <p className=" mb-5">Please enter your details to register!</p>
                  <div className="mb-3">
                    <Form onSubmit={handleSubmit}> 
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          First Name
                        </Form.Label>
                        <Form.Control type="text"
                         placeholder="Enter first name"
                         name="first_name"
                         value={userdata.first_name}
                         onChange={handleChange}
                         required
                         />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Last Name
                        </Form.Label>
                        <Form.Control type="text"
                         placeholder="Enter last name"
                         name="last_name"
                         value={userdata.last_name}
                         onChange={handleChange}
                         required
                         />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <Form.Control type="email"
                         placeholder="Enter email"
                         name="email"
                         value={userdata.email}
                         onChange={handleChange}
                         required
                         />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" 
                        placeholder="Password" 
                        name="password"
                        value={userdata.password}
                        onChange={handleChange}
                        required
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" 
                        placeholder="confirm Password" 
                        name="confirmpassword"
                        value={userdata.confirmpassword}
                        onChange={handleChange}
                        required
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                         Phone Number
                        </Form.Label>
                        <Form.Control type="text"
                         placeholder="phone number"
                         name="phone_Number"
                         value={userdata.phone_Number}
                         onChange={handleChange}
                         required
                         />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center mr-3">
                         Image
                        </Form.Label>
                        <Form.Control type="file"
                         placeholder="select image for profile"
                         name="image"
                         //value={userdata.image} cannot set value for file
                         onChange={handleImageChange}
                         required
                         accept="image/*"
                         />
                      </Form.Group>
                      
                      <div className="d-grid">
                        <Button variant="primary" type="submit">
                          Register
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

export default Register
