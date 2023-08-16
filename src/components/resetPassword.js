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
    let [userdata, setuserdata] = useState({
        otp: '',
        password: '',
        confirmpassword: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setuserdata((prevData) => ({
            ...prevData,
            [name]: value,
        }));

    }

    const handleSubmit = async (e) => {
        if (userdata.password !== userdata.confirmpassword) {
            confirmAlert({
                message: 'Password does not match',
                buttons: [
                    {
                        label: 'OK',
                    },
                ]
            })
        } else {
            e.preventDefault();
            try {
                const jsonData = { otp: userdata.otp, password: userdata.password }
                const response = await axios.patch(`/api/todos/resetpassword`, jsonData)
                console.log(response)
                confirmAlert({
                    message: response.data.message,
                    buttons: [
                        {
                            label: 'OK',
                        },
                    ]
                })
                navigate('/')
            }
            catch (error) {
                if (error.response) {
                    const errmess = await error.response.data.message;
                    //alert(errmess)
                    confirmAlert({
                        message: errmess,
                        buttons: [
                            {
                                label: 'OK',
                            },
                        ]
                    })
                }
                else {
                    confirmAlert({
                        title: 'Confirm to submit',
                        message: 'Something went wrong ',
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
                                    <h2 className="fw-bold mb-2 text-uppercase ">Reset password!</h2>
                                    <p className=" mb-5">Please enter New Password and OTP!</p>
                                    <div className="mb-3">
                                        <Form onSubmit={handleSubmit}>



                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label className="text-center">
                                                    OTP
                                                </Form.Label>
                                                <Form.Control type="text"
                                                    placeholder="Enter otp"
                                                    name="otp"
                                                    value={userdata.otp}
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
                                            <div className="d-grid">
                                                <Button variant="primary" type="submit">
                                                    Submit
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
