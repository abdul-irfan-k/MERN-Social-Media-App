import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { addPostFunc } from '../../../State/PostAction/PostAction';
import './css/index.css'

function AddPostForm() {
    const navigate= useNavigate()
    const [postData, setPostData] = useState({ Title: '', Content: '', Hashtag: '', FileURL: '' })
    const dispatch = useDispatch()
    const state = useState(state => state)
    const postDetails = useSelector(state => state)
    const [image, setImage] = useState(null)

    const onImageChange = async (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            setImage(URL.createObjectURL(file));
            setPostData({ ...postData, FileURL: file })
        }
    }
    const addPostHandler = () => {
        dispatch(addPostFunc(postData,navigate))
        setPostData({ ...postData, Title: '', Content: '', Hashtag: '', FileURl: '', Img: '' })
    }

    return (
        <>
            <div className='addPostBox'>
                <div className="imgBox flex-x-y">
                    {image == null ? <input type="file" name='newimage' className='fileInput' onChange={onImageChange} accept=".jpg, .jpeg, .png" /> : <img src={image} alt="selected image" className='inputImage' />}
                </div>
                <div className="formBox">
                    <div className="formList">
                        <div className="formLabel">
                            Hashtag
                        </div>
                        <input type="text" className='formInput' value={postData.Hashtag} onChange={(e) => setPostData({ ...postData, Hashtag: e.target.value })} />
                    </div>
                    <div className="formList">
                        <div className="formLabel">
                            Title
                        </div>
                        <input type="text" className='formInput' value={postData.Title} onChange={(e) => setPostData({ ...postData, Title: e.target.value })} />
                    </div>
                    <div className="formList">
                        <div className="formLabel">
                            Content
                        </div>
                        <input type="text" className='formInput' value={postData.Content} onChange={(e) => setPostData({ ...postData, Content: e.target.value })} />
                    </div>
                </div>
                <button onClick={(e) => addPostHandler(e)} className='postSubmitBtn'>Submit</button>
            </div>
        </>
    )
}

export default AddPostForm
