import React, { useState } from 'react'
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { useDispatch } from 'react-redux';
import { requestOtpFunc, signup } from '../../../State/UserAction/UserAction';
import { useNavigate } from 'react-router-dom';
import Otpform from '../Otp/Otpform';
import Googleauthentication from '../Googleauthentication/Googleauthentication';
import './css/index.css'
import Moonloader from '../../Loader/Moonloader';

function Signin() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [image, setImage] = useState(null)
    const [userDetails, setUserDetails] = useState({ name: '', email: '', password: '', confirmPassword: '', otp: '', profileImage: null })
    const [otpVerify, setOtpVerify] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const onImageChange = async (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            setImage(URL.createObjectURL(file));
            setUserDetails({ ...userDetails, profileImage: file })
        }
    }
    const inputHandler = (e) => setUserDetails({ ...userDetails, [e.target.name]: e.target.value })

    const requestOtpHandler = async (e) => {
        setIsLoading(true)
        const otprequestresutl = await requestOtpFunc(userDetails.email)
        setIsLoading(false)
        if (otprequestresutl.isOtpSended) {
            setOtpVerify(true)
        }
    }

    const submiHandler = (e) => { dispatch(signup(userDetails, navigate)) }

    return (
        <div className='containerBox'>
            {isLoading && <><div className='center-div-loader'><Moonloader /></div><div className='fade-wrapper'></div></>}
            {
                !otpVerify &&
                <Container>
                    <Row className="vh-100 d-flex justify-content-center align-items-center">
                        <Col md={8} lg={6} xs={12}>
                            <div className="border border-3 border-primary"></div>
                            <Card className="shadow">
                                <Card.Body>
                                    <div className="mb-3 mt-md-4">
                                        <h2 className="fw-bold mb-2 text-uppercase ">Sign Up</h2>
                                        <p className=" mb-5">Please enter your login and password!</p>
                                        <div className="mb-3">
                                            <Form>
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <div className="signInImgBOx flex-x-y">

                                                        {image == null ? <><sapn>Select Profile Image</sapn><input type="file" name='profileImage' className='fileInput' onChange={onImageChange} accept=".jpg, .jpeg, .png" /> </> : <img src={image} alt="selected image" className='signInInputImage' />}
                                                    </div>
                                                    <Form.Label className="text-center">
                                                        Name
                                                    </Form.Label>
                                                    <Form.Control type="text" placeholder="Enter Name" name='name' onChange={inputHandler} />
                                                </Form.Group>
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label className="text-center">
                                                        Email address
                                                    </Form.Label>
                                                    <Form.Control type="email" placeholder="Enter email" name='email' onChange={inputHandler} />
                                                </Form.Group>

                                                <Form.Group
                                                    className="mb-3"
                                                    controlId="formBasicPassword"
                                                >
                                                    <Form.Label>Password</Form.Label>
                                                    <Form.Control type="password" placeholder="Password" name='password' onChange={inputHandler} />
                                                </Form.Group>
                                                <Form.Group
                                                    className="mb-3"
                                                    controlId="formBasicPassword"
                                                >
                                                    <Form.Label>Comfirm Password</Form.Label>
                                                    <Form.Control type="password" placeholder="Comfirm Password" name='confirmPassword' onChange={inputHandler} />
                                                </Form.Group>

                                                <div className="d-grid">
                                                    <Button variant="primary" type="button" onClick={requestOtpHandler}>
                                                        Submit
                                                    </Button> :
                                                </div>
                                            </Form>

                                            <div className='d-grid justify-content-center'>
                                                <Googleauthentication />
                                            </div>

                                            <div className="mt-1">
                                                <p className="mb-0  text-center">
                                                    You have an account?{" "}
                                                    <a className="text-primary fw-bold" onClick={() => navigate('/login')} >
                                                        Login
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
            }
            {
                otpVerify && <Otpform callBackFunc={submiHandler} inputHandler={inputHandler} email={userDetails.email} />
            }
        </div>
    )
}

export default Signin

