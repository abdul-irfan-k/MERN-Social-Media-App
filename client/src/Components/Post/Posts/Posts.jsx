import { isContentEditable } from '@testing-library/user-event/dist/utils';
import React, { useEffect, useRef, useState } from 'react'
import { ModalTitle } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsFunc } from '../../../State/PostAction/PostAction';
import Post from './Post/Post';
import InfiniteScroll from 'react-infinite-scroll-component'
import Moonloader from '../../Loader/Moonloader';
import Hashloader from '../../Loader/Hashloader';


const   Posts = () => {
    const dispatch = useDispatch()
    let posts = useSelector(state => state.post?.posts)
    let contiainer = useSelector(state => state.post)
    let loading = useSelector(state => state.post.loading)

    useEffect(() => {
        if (!posts.length) dispatch(getPostsFunc())
    }, [])

    const fetchData = () => {
        let num = Math.ceil((posts.length / 5) + 1)
        dispatch(getPostsFunc(num))
    }

    return (
        <div className='containerBox'>

            {loading && !posts.length ?

                <Container className='d-flex' style={{ minHeight: "90vh" }}><Hashloader /></Container>
                : <div className="postPageContainer">
                    {posts !== undefined && posts.map((obj, index) => {
                        return <Post key={index} Title={obj.Title} Hashtag={obj.Hashtag} Content={obj.Content} id={obj._id} FileURL={obj.FileURL} creator={obj?.creatorDetail[0]} likes={obj.likes} />
                    })}

                    <InfiniteScroll
                        dataLength={posts?.length} //This is important field to render the next data
                        next={fetchData}
                        hasMore={true}
                        loader={<Moonloader />}
                        scrollThreshold="50px"
                    />
                </div>
            }

        </div>
    )
}




export default Posts