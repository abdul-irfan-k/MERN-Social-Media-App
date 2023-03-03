import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment as faCommentLite, faShareFromSquare, faBookmark as faBookmarkLite } from '@fortawesome/free-regular-svg-icons'
import Like from '../Posts/Like/Like';
import { getPostFunc } from '../../../State/PostAction/PostAction';
import './css/index.css'
import Postsetting from '../Posts/Postsetting/Postsetting';


const Viewpost = () => {
    let firstRender = true
    const dispatch = useDispatch()
    const { id } = useParams()
    const post = useSelector(state => state.post.post)
    const userDetails = useSelector(state => state?.user?.user?.userDetails)

    useEffect(() => {
        if (!firstRender) {
            return
        }
        firstRender = !firstRender
        dispatch(getPostFunc(id))
    }, [])

    return (
        <div>
            {post._id &&
                <div className="postdetail">
                    <div className="postBox-left">
                        <div className="nameAndImageBox">
                            <div className="postUserDetail">
                                <img src={`/userimage/${post?.creatorDetail[0]?._id}.jpg`} alt="" className="postUserImage" />
                                <span>{post?.creatorDetail[0]?.name}</span>
                            </div>
                            <div>
                                <img src={`/postimage/${post._id}.jpg`} alt="" className="postImage" />
                            </div>
                        </div>
                        <div className="postDetailContainer">
                            <div className="postDetailBox">
                                <div className="postIconContainer">
                                    <div className="lefticonBox">
                                        <Like likes={post?.likes} postid={post?._id} />
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
                                    <span className="hashtag">#{post.Hashtag}</span>
                                    <span className="title">{post.Title}</span>
                                    <span className="content">{post.Content}</span>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="postbox-right">
                        {userDetails?._id == post?.creatorDetail[0]._id ? <Postsetting postId={post._id} /> : <div></div>}

                        <div className="postbox__right-commentbox">
                            <div className="commentbox-box">
                                <img src={`/userimage/${post?.creatorDetail[0]?._id}.jpg`} alt="" className="commentbox__box-image" />
                                <div className="commentbox__box-content">
                                    <span className="commentbox__box-content-name">{post?.creatorDetail[0]?.name}</span>
                                    <span className="commentbox__box-content-comment">comment section is testing  </span>
                                </div>
                            </div>


                        </div>
                        <div className="postbox__right-inputbox">
                            <input type="text" className="postbox__right-inputbox-input" />
                            <div className="postbox__right-inputbox-btn">Add</div>
                        </div>
                        <div></div>
                    </div>
                </div>}

        </div >
    )
}

export default Viewpost
