import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp as lite, faHeart as faHeartLite, faComment as faCommentLite, faShareFromSquare, faBookmark as faBookmarkLite } from '@fortawesome/free-regular-svg-icons'
import '../css/index.css'
import { likePostFunc } from '../../../../State/PostAction/PostAction'

const Like = ({  likes,postid }) => {
  const dispatch = useDispatch()

  const userDetails = useSelector(state => state.user?.user?.userDetails)
  const [liked, setLiked] = useState(false)
  const [liekBtnClicked, setLikeBtnClicked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const isLiked = likes.likelist.findIndex(id => id === userDetails?._id) !== -1

  const likeHandler = (likeValue) => {
    if (!liekBtnClicked) isLiked ? setLikeCount(likes.likeCount - 1) : setLikeCount(likes.likeCount + 1)
    else likeValue ? setLikeCount(likeCount + 1) : setLikeCount(likeCount - 1)

    setLiked(likeValue)
    setLikeBtnClicked(true)
    dispatch(likePostFunc({ postid }))
  }
  return (
    <>
      {liekBtnClicked ?
        liked ? <FontAwesomeIcon icon={faHeart} onClick={() => likeHandler(!liked)} className='fontIcon pointer' /> : <FontAwesomeIcon icon={faHeartLite} onClick={() => likeHandler(!liked)} className='fontIcon pointer' />
        : isLiked ? <FontAwesomeIcon icon={faHeart} onClick={() => { likeHandler(!isLiked); }} className='fontIcon pointer' /> : <FontAwesomeIcon icon={faHeartLite} onClick={() => { likeHandler(!isLiked) }} className='fontIcon pointer' />}

      <span>{liekBtnClicked ? likeCount : likes.likeCount} like</span>
    </>
  )
}

export default Like
