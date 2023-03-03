import React from 'react'
import { useSelector } from 'react-redux'
import NavbarComponent from '../Components/Layout/Navbar/Navbar'
import EditUserForm from '../Components/User/Edituser/Edituser'

function Edituserpage() {
    const userDetail = useSelector(state => state.user.user?.userDetails)
    return (
        <div>
            <NavbarComponent />
            {userDetail !== undefined && <EditUserForm  {...userDetail} />}
        </div>
    )
}

export default Edituserpage
