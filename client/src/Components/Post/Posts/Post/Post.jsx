import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getPostFunc} from '../../../../State/PostAction/PostAction';
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faComment as faCommentLite, faShareFromSquare, faBookmark as faBookmarkLite } from '@fortawesome/free-regular-svg-icons'
import Like from '../Like/Like';
import '../css/index.css'

function Post(props) {

    const { Hashtag, Title, Content, id, FileURL, creator, likes } = props

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userDetails = useSelector(state => state.user?.user?.userDetails)
    const userid = userDetails?.id

    const editHandler = () => {
        dispatch(getPostFunc(id))
        navigate(`/editpost/${id}`)
    }


    return (
        <div className="postBox">
            <div className="nameAndImageBox">
                <div className="postUserDetail">
                    <img src={`userimage/${creator?._id}.jpg`} alt="" className="postUserImage" onError={(e) => { e.target.src = "/userimage/default.jpg" }} />
                    <span onClick={() => navigate(`profilepage/${creator._id}`)}>{creator?.name}</span>
                </div>
                <div>
                    <img src={`postimage/${id}.jpg`} alt="" className="postImage" />
                </div>
            </div>
            <div className="postDetailContainer">
                <div className="postDetailBox">

                    <div className="postIconContainer">
                        <div className="lefticonBox">
                            <Like likes={likes} postid={id} />
                        </div>
                        <div className="leftIconBox">
                            <FontAwesomeIcon icon={faCommentLite} className='fontIcon pointer' />
                            <span>5 comm</span>
                        </div >
                        <div>
                            <FontAwesomeIcon icon={faShareFromSquare} className='fontIcon pointer' />
                        </div>
                        <div className="rightIconBox">
                            <FontAwesomeIcon icon={faBookmarkLite} className='fontIcon pointer' />
                        </div>
                    </div>
                    <div className="postContent">
                        <span className="hashtag">#{Hashtag}</span>
                        <span className="title">{Title}</span>
                        <span className="content">{Content}</span>
                    </div>
                </div>
                <div className="addCommentBtnDiv flex-x-y">
                    <div className="addCommentBtn flex-x-y pointer" onClick={() => navigate(`/viewpost/${id}`)}>Add Comment</div>
                </div>
            </div>
        </div>
    )
}

export default Post
