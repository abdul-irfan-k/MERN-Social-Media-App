import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faGear } from '@fortawesome/free-solid-svg-icons'
import Alertbox from '../Alartbox/Alertbox';
import { deleteUserFunc, Logout } from '../../State/UserAction/UserAction';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import './css/index.css'

const Settingbox = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isBtnClicked, setIsBtnClicked] = useState(false)

  const [alertBox, setAlertBox] = useState(false)
  const [alertDetail, setAlertDetails] = useState({ header: '', callbackFunc: null })

  const settingBtnHandler = () => setIsBtnClicked(!isBtnClicked)
  const btnClickHandler = (header, callbackFunc) => {
    setIsBtnClicked(false)
    setAlertBox(true)
    setAlertDetails({ header, callbackFunc })
  }

  const LogoutHandler = () => { dispatch(Logout(navigate)) }
  const deleteHandler = () => { dispatch(deleteUserFunc(navigate)) }
  const changePasswordHandler = () => navigate('/resetpassword')

  return (
    <>
      <div className="setting-button" onClick={settingBtnHandler}><img src={"/appimage/setting.png"} alt="" className='pointer' /></div>

      {isBtnClicked && <div className="settingbox">
        <div className="settingbox__closebtn"   > <span className='settingbox__closebtn-button' onClick={settingBtnHandler}><FontAwesomeIcon icon={faCircleXmark} className='settingbox__closebtn-button-icon pointer' /></span ></div>

        <div className="settingbox__header" ><span><FontAwesomeIcon icon={faGear} /> Setting</span></div>
        <div className="settingbox__button-box">
          <div className="settingbox__buttonbox-button pointer">Dark Mode</div>
          <div className="settingbox__buttonbox-button pointer">Time Line</div>
          <div className="settingbox__buttonbox-button pointer" onClick={changePasswordHandler}>Change Password</div>
          <div className="settingbox__buttonbox-button pointer " onClick={() => btnClickHandler('Logout', LogoutHandler)}>Logout</div>
          <div className="settingbox__buttonbox-button pointer" onClick={() => btnClickHandler('Delete Account', deleteHandler)}>Delete Account</div>
        </div>
      </div>}
      {isBtnClicked && <div className='fade-wrapper' ></div>}
      {alertBox && <Alertbox setAlertBox={setAlertBox} header={alertDetail.header} callbackFunc={alertDetail.callbackFunc} />}
    </>
  )
}

export default Settingbox
