import React, { useState } from 'react'
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import jwt_decode from 'jwt-decode'
import { useDispatch } from 'react-redux';
import { editUserFunc, LoginWithGoogle, requestOtpFunc, signup } from '../../../State/UserAction/UserAction';
import { useNavigate } from 'react-router-dom';
import './css/index.css'

function EditUserForm(props) {
    const { name, email, _id } = props
    
    const [image, setImage] = useState(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [userDetails, setUserDetails] = useState({ name, email, _id,userImage:'' })


    const onImageChange = async (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            setImage(URL.createObjectURL(file));
            setUserDetails({...userDetails,userImage:file})
        }
    }
    const inputHandler = (e) => setUserDetails({ ...userDetails, [e.target.name]: e.target.value })

    const submiHandler = (e) => {
        e.preventDefault()
        dispatch(editUserFunc(userDetails,navigate))
    }


    return (
        <div className='containerBox'>
            <Container>
                <Row className="vh-100 d-flex justify-content-center align-items-center">
                    <Col md={8} lg={6} xs={12}>
                        <div className="border border-3 border-primary"></div>
                        <Card className="shadow">
                            <Card.Body>
                                <div className="mb-3 mt-md-4">
                                    <h2 className="fw-bold mb-2 text-uppercase ">Edit Profile</h2>
                                    <div className="mb-3">
                                        <Form>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <div className="editUserImageContainer flex-x-y">
                                                <img src={image ?  image: `userimage/${_id}.jpg`} alt="selected image" className='editUserImage' onError={(e) =>{ e.target.src = "/appimage/default.jpg"}}/>
                                                <div>
                                                 <span>Change Image</span>
                                                <input type="file" name='newImage' className='fileInput' onChange={onImageChange} accept=".jpg, .jpeg, .png" /> 
                                                </div>
                                                </div>
                                                <Form.Label className="text-center">
                                                    Name
                                                </Form.Label>
                                                <Form.Control type="text" placeholder="Enter Name" name='name' onChange={inputHandler} defaultValue={userDetails.name} />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label className="text-center">
                                                    Email address
                                                </Form.Label>
                                                <Form.Control type="email" placeholder="Enter email" name='email' onChange={inputHandler} defaultValue={userDetails.email} />
                                            </Form.Group>


                                       
                                            <div className="d-grid">
                                               
                                                        <Button variant="primary" type="submit" onClick={submiHandler}>
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

export default EditUserForm

