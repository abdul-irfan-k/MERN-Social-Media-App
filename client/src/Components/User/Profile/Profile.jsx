import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { getUserPostFunc } from '../../../State/PostAction/PostAction';
import { followUserRequest, getOtherUserDetailRequest, getUserPostRequest } from '../../../Api/Api';
import './css/index.css'
import Settingbox from '../../Settingbox/Settingbox';

const Profilecomponent = (props) => {
    const { otherUserProfile, otherUserId } = props
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userDetails = useSelector(state => state?.user?.user?.userDetails)
    const userPosts = useSelector(state => state.post?.userPost)

    const [otherUserDetail, setOtherUserDetail] = useState({ name: '', email: '', _id: '', followsDetail: [], isFollowing: false })
    const [otherUserPost, setOtherUserPost] = useState([])
    const [isFollowing, setIsFollowing] = useState(false)
    const isOtherUserProfile = otherUserProfile == true


    const editBtnHandler = () => navigate('/edituser')
    if (otherUserDetail?._id == userDetails?._id) navigate('/profile')

    useEffect(() => {
        if (!isOtherUserProfile) dispatch(getUserPostFunc(userDetails?._id))
    }, [userDetails])

    useEffect(() => {
        if (isOtherUserProfile) getOtherUserDetailHandler()
    }, [])


    const getOtherUserDetailHandler = async () => {
        if (otherUserProfile == false) return
        let { data } = await getOtherUserDetailRequest({ id: otherUserId })
        data = data[0]
        if (data?.followsDetail?.followers?.findIndex(id => id == userDetails?._id) !== -1) data.isFollowing = true
        setOtherUserDetail({ ...otherUserDetail, ...data })

        const post = await getUserPostRequest(data._id)
        setOtherUserPost(post.data)
    }

    const followingHandler = async () => {
        setOtherUserDetail({ ...otherUserDetail, isFollowing: !otherUserDetail.isFollowing })
        const { data } = await followUserRequest({ followuserid: otherUserDetail?._id })
    }

    return (
        <>
            <div className="profileContainer">
                {!isOtherUserProfile && <Settingbox />}
                <div className="profileDetailBox">
                    <div className="pfofileImageBox">
                        <img src={isOtherUserProfile ? `/userimage/${otherUserDetail?._id}.jpg` : `/userimage/${userDetails?._id}.jpg`} alt="" onError={(e) => { e.target.src = "/userimage/default.jpg" }} />
                    </div>
                    <div className="userDetailContainer">
                        <div className="userDetailBox">
                            <div className="nameBox">
                                <span className="userName">{isOtherUserProfile ? otherUserDetail.name : userDetails.name}</span>
                                <span>{isOtherUserProfile ? otherUserDetail.email : userDetails.email}</span>
                                <span>Web Developer</span>
                            </div>
                            <div className="followingDetailBox">
                                <div className="followingCountBox">
                                    <div>
                                        <span>200</span>
                                        <span>Following</span>
                                    </div>
                                    <div>
                                        <span>148</span>
                                        <span>Followers</span>
                                    </div>
                                </div>
                                <div className="buttonBox">
                                    {
                                        otherUserProfile == true ?
                                            <> {otherUserDetail?.isFollowing ? <div className="blueOutlineBtn" onClick={followingHandler}>Following </div> : <div className="followingBtn" onClick={followingHandler}>Follow </div>} <div className="editBtn" onClick={editBtnHandler} >Message</div></>
                                            : <><div className="followingBtn">Setting</div><div className="editBtn" onClick={editBtnHandler} >Edit</div></>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="selectContainer">
                    <span className="profileActive">Posts</span>
                    <span>Reels</span>
                    <span>Saved</span>
                </div>

                <div className="postContainer">
                    {!isOtherUserProfile && userPosts?.length && <Postcontainer posts={userPosts} navigate={navigate} />}
                    {isOtherUserProfile && otherUserPost?.length && <Postcontainer posts={otherUserPost} navigate={navigate} />}
                </div>
            </div>
        </>
    );
}

export default Profilecomponent


const Postcontainer = ({ posts, navigate }) => {
    return (
        <> {
            posts.map((post, id) => <div key={id}>
                <img src={`/postimage/${post._id}.jpg`} alt="" onClick={() => navigate(`/viewpost/${post._id}`)} />
            </div>
            )
        }</>
    )
}