import React, { useState } from 'react'
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../../State/UserAction/UserAction';
import Googleauthentication from '../Googleauthentication/Googleauthentication';


function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [userDetails, setUserDetails] = useState({ email: '', password: '' })

    const inputHandler = (e) => setUserDetails({ ...userDetails, [e.target.name]: e.target.value })
    const LoginHandler = (e) => {
        e.preventDefault()

        dispatch(login(userDetails, navigate))
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
                                    <h2 className="fw-bold mb-2 text-uppercase ">Login</h2>
                                    <p className=" mb-5">Please enter your login and password!</p>
                                    <div className="mb-3">
                                        <Form>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label className="text-center">
                                                    Email address
                                                </Form.Label>
                                                <Form.Control type="email" placeholder="Enter email" name="email" onChange={inputHandler} />
                                            </Form.Group>

                                            <Form.Group
                                                className="mb-3"
                                                controlId="formBasicPassword"
                                            >
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control type="password" placeholder="Password" name="password" onChange={inputHandler} />
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
                                                <Button variant="primary" type="submit" onClick={LoginHandler}>
                                                    Login
                                                </Button>
                                            </div>
                                        </Form>
                                        <div className='d-grid justify-content-center my-2'>
                                            <Googleauthentication />
                                        </div>
                                        <div className="mt-1">
                                            <p className="mb-0  text-center">
                                                Don't have an account?{" "}
                                                <a className="text-primary fw-bold" onClick={() => navigate('/signup')}>
                                                    Sign Up
                                                </a>
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
    )
}

export default Login