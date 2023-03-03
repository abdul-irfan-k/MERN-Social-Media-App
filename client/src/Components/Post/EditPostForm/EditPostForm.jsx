import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { addPostFunc, editPostFunc } from '../../../State/PostAction/PostAction';


function EditPostForm(props) {
    const dispatch = useDispatch()
    const navigage = useNavigate()
    const posts = useSelector(state => state.post)
    const { Title, Content, Hashtag, _id } = props
    const [postData, setPostData] = useState({ Title, Content, Hashtag, FileURL: '', _id })
    const [image, setImage] = useState(null)
    const state = useState(state => state)
    const postDetails = useSelector(state => state)

    const savePostHandler = () => { dispatch(editPostFunc(postData, navigage)) }

    const onImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            setImage(URL.createObjectURL(file))
            setPostData({ ...postData, FileURL: file })
        }

    }

    return (
        <>
            <div className='addPostBox'>
                <div className="editpage-iamgebox flex-x-y">
                    <img src={image == null ? `/postimage/${_id}.jpg` : image} alt="selected image" className='editpage-inputImage' />
                    <div className='editpage-inputbox'>
                        <span>Change Image</span>
                        <input type="file" name='newimage' className='editpage-input' onChange={onImageChange} accept=".jpg, .jpeg, .png" />
                    </div>
                </div>
                <div className="formBox">
                    <div className="formList">
                        <div className="formLabel">
                            Hashtag
                        </div>
                        <input type="text" className='formInput' defaultValue={Hashtag} onChange={(e) => setPostData({ ...postData, Hashtag: e.target.value })} />
                    </div>
                    <div className="formList">
                        <div className="formLabel">
                            Title
                        </div>
                        <input type="text" className='formInput' defaultValue={Title} onChange={(e) => setPostData({ ...postData, Title: e.target.value })} />
                    </div>
                    <div className="formList">
                        <div className="formLabel">
                            Content
                        </div>
                        <input type="text" className='formInput' defaultValue={Content} onChange={(e) => setPostData({ ...postData, Content: e.target.value })} />
                    </div>
                </div>


                <button onClick={(e) => savePostHandler(e)} className='postSubmitBtn'>Submit</button>
            </div>

        </>
    )
}

export default EditPostForm
