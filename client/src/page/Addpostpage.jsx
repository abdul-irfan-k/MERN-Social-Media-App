import React from 'react'
import { Navbar } from 'react-bootstrap'
import NavbarComponent from '../Components/Layout/Navbar/Navbar'
import Posts from '../Components/Post/Posts/Posts'
import Container from 'react-bootstrap/Container';
import AddPostForm from '../Components/Post/AddPostForm/AddPostForm';

function Postpage() {
    return (
        <div >
            <NavbarComponent />
            <AddPostForm/>
        </div>
    )
}

export default Postpage