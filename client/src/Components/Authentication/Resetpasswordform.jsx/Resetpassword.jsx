import React, { useState } from 'react'
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { verifyOtpRequest } from '../../../Api/Api';
import { requestOtpFunc, resetPasswordFunc, resetPasswordWithOtpFunc } from '../../../State/UserAction/UserAction';
import Moonloader from '../../Loader/Moonloader';
import Otpform from '../Otp/Otpform';

const Resetpassword = () => {
    const navigate = useNavigate()
    const userDetails = useSelector(state => state?.user?.user?.userDetails)

    const [passwordDetail, setPasswordDetail] = useState({ oldPassword: '', newPassword: '', newComfirmPassword: '', otp: '' })
    const [loginWithOtp, setLoginWithOtp] = useState(false)
    const [isCorrectOTP, setIsCorrectOTP] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const inputHandler = (e) => setPasswordDetail({ ...passwordDetail, [e.target.name]: e.target.value })

    const submitHandler = () => {
        loginWithOtp ? resetPasswordWithOtpFunc(passwordDetail, navigate) : resetPasswordFunc(passwordDetail, navigate)
    }

    const requestOtpHandler = async (e) => {
        setIsLoading(true)
        const otprequestresutl = await requestOtpFunc(userDetails.email)
        if (otprequestresutl.isOtpSended) {
            setIsLoading(false)
            setLoginWithOtp(true)
        }
    }

    const verifyOtpHandler = async () => {
        const { data } = await verifyOtpRequest({ email: userDetails.email, otp: passwordDetail.otp })
        if (data.isCorrectOTP) setIsCorrectOTP(true)
    }


    return (
        <div>
            {isLoading && <><div className='center-div-loader'><Moonloader /></div><div className='fade-wrapper'></div></>}

            {!loginWithOtp | isCorrectOTP && <Container>

                <Row className="vh-100 d-flex justify-content-center align-items-center">
                    <Col md={8} lg={6} xs={12}>
                        <div className="border border-3 border-primary"></div>
                        <Card className="shadow">
                            <Card.Body>

                                <div className="mb-3 mt-md-4">
                                    <h2 className="fw-bold mb-2 text-uppercase ">Reset Password </h2>
                                    <p className=" mb-5">Please enter old and new password </p>
                                    <div className="mb-3">
                                        <Form>
                                            {!isCorrectOTP && !loginWithOtp &&
                                                <Form.Group
                                                    className="mb-3"
                                                    controlId="formBasicPassword">
                                                    <Form.Label>Old Password</Form.Label>
                                                    <Form.Control type="password" placeholder="Enter old password" name="oldPassword" onChange={inputHandler} />
                                                </Form.Group>
                                            }
                                            <Form.Group
                                                className="mb-3"
                                                controlId="formBasicPassword"
                                            >
                                                <Form.Label>New Password</Form.Label>
                                                <Form.Control type="password" placeholder="Enter new password " name="newPassword" onChange={inputHandler} />
                                            </Form.Group>
                                            <Form.Group
                                                className="mb-3"
                                                controlId="formBasicPassword"
                                            >
                                                <Form.Label>Comfirm Password </Form.Label>
                                                <Form.Control type="password" placeholder="Enter new password " name="newComfirmPassword" onChange={inputHandler} />
                                            </Form.Group>
                                            {!isCorrectOTP && !loginWithOtp &&
                                                <Form.Group
                                                    className="mb-3"
                                                    controlId="formBasicCheckbox"  >
                                                    <p className="small">
                                                        <a className="text-primary" onClick={requestOtpHandler}>
                                                            Forgot password? Change password with OTP
                                                        </a>
                                                    </p>
                                                </Form.Group>
                                            }
                                            <div className="d-grid">
                                                <Button variant="primary" type="button" onClick={submitHandler}>
                                                    Change Password
                                                </Button>
                                            </div>
                                        </Form>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>}
            {loginWithOtp && !isCorrectOTP && <Otpform email={userDetails.email} inputHandler={inputHandler} callBackFunc={verifyOtpHandler} />}
        </div>
    )
}

export default Resetpassword
