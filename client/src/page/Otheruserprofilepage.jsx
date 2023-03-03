import React from 'react'
import { useParams } from 'react-router'
import NavbarComponent from '../Components/Layout/Navbar/Navbar'
import Profilecomponent from '../Components/User/Profile/Profile'

function Otheruserprofilepage() {
  const {id} = useParams()
  return (
    <div>
      <NavbarComponent/>
      <Profilecomponent otherUserId={id} otherUserProfile={true} />
    </div>
  )
}

export default Otheruserprofilepage
