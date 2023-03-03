import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { Logout } from '../../../State/UserAction/UserAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faMessage, faCirclePlus, faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons'
import { faMessage as faMessageLite, faUser as faUserLite } from '@fortawesome/free-regular-svg-icons'
import './css/index.css'

const NavbarComponent = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(state => state.user?.user)

  const LogoutHandler = () => {
    dispatch(Logout())
  }

  if (user !== null) {
    const expireAt = user?.expireAt
    if (expireAt < new Date().getTime()) LogoutHandler()
  }
  return (
    <div >
      <div className="navBar">
        <div className="instagramHead flex-x-y">
          <h1>Instagram</h1>
        </div>
        <div className="menuSection">
          <div className="menuBox">

            <div className="menuList active pointer" onClick={() => navigate('/')}  >
              <FontAwesomeIcon icon={faHouse} className='icon' />
              <span>Home</span>
            </div>
            <div className="menuList pointer" onClick={() => navigate('/search')}>
              <FontAwesomeIcon icon={faMagnifyingGlass} className='icon' />
              <span>Search</span>
            </div>
            <div className="menuList pointer" onClick={() => navigate('/addpost')}>
              <FontAwesomeIcon icon={faCirclePlus} className='icon' />
              <span>Create</span>
            </div>
            <div className="menuList pointer" onClick={() => user !== null ? navigate('/') : navigate('/signup')}>
              {user !== null ? <>    <FontAwesomeIcon icon={faMessageLite} className='icon' />
                <span>Message</span></> : <>    <FontAwesomeIcon icon={faUserLite} className='icon' />
                <span>Singup</span></>}
            </div>
            <div className="menuList pointer" onClick={() => user !== null ? navigate('/profile') : navigate('/login')}>
              {user !== null ? <>    <FontAwesomeIcon icon={faUserLite} className='icon' />
                <span>Profile</span></> : <>    <FontAwesomeIcon icon={faUserLite} className='icon' />
                <span>Login</span></>}

            </div>

          </div>
          <div className="profileBox">
            <img src={`/userimage/${user?.userDetails?._id}.jpg`} alt="userimage" onError={(e) => { e.target.src = "/userimage/default.jpg" }} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavbarComponent

