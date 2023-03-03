import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { searchPostRequest, searchUserRequest } from '../../Api/Api'
import Post from '../Post/Posts/Post/Post'
import './css/index.css'

const Searchbox = () => {
    const navigate = useNavigate()
    const [searchType, setSearchType] = useState('user')
    const [input, setInput] = useState('')

    const [searchResult, setSearchResutl] = useState([])
    const [postResult, setPostResult] = useState([])

    const searchHandler = async () => {
        setSearchResutl([])
        const { data } = (searchType === 'post' ? await searchPostRequest(input) : await searchUserRequest(input))
        if (searchType == 'post') setPostResult(data)
        else setSearchResutl(data)
    }
    return (
        <div>
            <div className="search-container">
                <div className="searchbox">
                    <input type="text" className="searchbox__input" value={input} onChange={(e) => setInput(e.target.value)} />
                    <div className="searchbox__button" onClick={searchHandler}>Search</div>
                </div>
                <div className="selectbox">
                    <span className={`selectbox__user-${searchType == 'user' && 'selected'} pointer`} onClick={() => setSearchType('user')}>user</span>
                    <span className={`selectbox__user-${searchType == 'post' && 'selected'} pointer`} onClick={() => setSearchType('post')}>post</span>
                </div>
                <div className="line">
                    <div className={`line-${searchType == 'user' && 'active'}`} ></div>
                    <div className={`line-${searchType == 'post' && 'active'}`} ></div>
                </div>

                <div className="userlistbox">
                    {searchType == 'user' && searchResult.length && <Userlistbox searchResult={searchResult} navigate={navigate} />}
                    {searchType == 'post' && postResult.length && <div className='postresult-container'>
                        {postResult.map((post, index) => {
                            return <Post key={index} Title={post.Title} Hashtag={post.Hashtag} Content={post.Content} id={post._id} FileURL={post._id} creator={post?.creatorDetail[0]} likes={post.likes} />
                        })}
                    </div>
                    }
                </div>

            </div>
        </div>
    )
}

export default Searchbox


const Userlistbox = ({ searchResult ,navigate}) => {
    return (<>
        {searchResult.length && searchResult.map((user, id) => {
            return <div className="userlistbox__box" key={id}>
                <img src={`/userimage/${user._id}.jpg`} alt="" className="userlistbox__box-image" onError={(e) => { e.target.src = "/appimage/default.jpg" }} />
                <div className="userlistbox__box-content">
                    <span className="userlistbox__box-content-name" onClick={() => navigate(`/profilepage/${user._id}`)}>{user.name}</span>
                    <span className="userlistbox__box-content-email">{user.email}</span>
                </div>
            </div>
        })}</>
    )
}

