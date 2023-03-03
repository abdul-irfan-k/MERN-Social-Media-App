import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import NavbarComponent from '../Components/Layout/Navbar/Navbar'
import EditPostForm from '../Components/Post/EditPostForm/EditPostForm'
import { getPostFunc } from '../State/PostAction/PostAction'

function Editpost() {
  const dispatch = useDispatch()
  const post = useSelector(state => state.post.post)
  const { id } = useParams()
  useEffect(() => {
    if (post._id) return
    dispatch(getPostFunc(id))
  }, [post])
  return (
    <div>
      <NavbarComponent />
      {post._id && <EditPostForm {...post} />}
    </div>
  )
}

export default Editpost