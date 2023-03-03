import React from 'react'
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { useNavigate } from 'react-router';

const Otpform = ({ callBackFunc, inputHandler, email }) => {
    return (
        <div>
            <Container>
                <Row className=" d-flex justify-content-center align-items-center" style={{ height: "70vh" }}>
                    <Col md={8} lg={6} xs={12}>
                        <div className="border border-3 border-primary"></div>
                        <Card className="shadow">
                            <Card.Body>
                                <div className="mb-3 mt-md-4">
                                    <h2 className="fw-bold mb-2 text-uppercase ">Verify Otp</h2>
                                    <p className='mb-5'>otp sended to {email}</p>
                                    <div className="mb-3">
                                        <Form>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label className="text-center">
                                                    Otp
                                                </Form.Label>
                                                <Form.Control type="number" placeholder="Enter otp" name='otp' onChange={inputHandler} />
                                            </Form.Group>
                                            <div className='d-grid'>
                                                <Button variant="primary" type="button" onClick={callBackFunc}>
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

export default Otpform
