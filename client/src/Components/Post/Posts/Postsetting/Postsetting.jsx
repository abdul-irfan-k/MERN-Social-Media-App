import React, { useState } from 'react'
import Alertbox from '../../../Alartbox/Alertbox'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import './css/index.css'
import { useDispatch } from 'react-redux';
import { deletePostFunc } from '../../../../State/PostAction/PostAction';
import { useNavigate } from 'react-router';

const Postsetting = ({ postId }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [EditBtnClicked, setEditBtnClicked] = useState(false)
    const [alertBox, setAlertBox] = useState(false)
    const [alertDetail, setAlertDetails] = useState({ header: '', callbackFunc: null })

    const cancelHandler = () => setEditBtnClicked(false)
    const btnClickHandler = (header, callbackFunc) => {
        setEditBtnClicked(false)
        setAlertBox(true)
        setAlertDetails({ header, callbackFunc })
    }

    const editHandler = () => navigate(`/editpost/${postId}`)
    const deleteHandler = () => { dispatch(deletePostFunc(postId, navigate)) }
    return (
        <>
            <div className="postbox__right-editbox"><span className="postbox__right-editbox-editbtn"><FontAwesomeIcon icon={faEllipsisV} className='fontIcon' onClick={() => setEditBtnClicked(true)} /></span></div>
            {EditBtnClicked && <>
                <div className="post-setting">
                    <div className="post-setting__button">copy</div>
                    <div className="post-setting__button">Share</div>
                    <div className="post-setting__button" onClick={editHandler}>Edit Post</div>
                    <div className="post-setting__button" onClick={() => btnClickHandler('Delete Post', deleteHandler)}>Delete Post</div>
                    <div className="post-setting__button post-setting__button-cancel" onClick={cancelHandler}>cancel</div>
                </div>
                <div className="fadebox"></div>
            </>
            }
            {alertBox && <Alertbox setAlertBox={setAlertBox} header={alertDetail.header} callbackFunc={alertDetail.callbackFunc} />}
        </>
    )
}

export default Postsetting
