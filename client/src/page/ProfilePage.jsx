import React from 'react'
import { useSelector } from 'react-redux'
import NavbarComponent from '../Components/Layout/Navbar/Navbar'
import Profilecomponent from '../Components/User/Profile/Profile'

function ProfilePage() {
  const user = useSelector(state => state.user)
  return (
    <div>
      {user != null && user.user != null && <> <NavbarComponent />
        <Profilecomponent /></>}
    </div>
  )
}

export default ProfilePage