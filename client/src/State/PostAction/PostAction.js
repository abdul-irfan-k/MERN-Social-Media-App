import { addPostRequest, getPostsRequest, updatePostRequest, getPostRequest, deletePostRequest, searchPostRequest, likePostRequest, getUserPostRequest } from "../../Api/Api"
import { deletePost, editPost, getPost, getPosts, getUserPost, loadedPost, loadingPost, reloadPosts } from "../Reducer/PostReducer"

export const addPostFunc = (post, navigate) => async (dispatch) => {
    const { data } = await addPostRequest(post)
    dispatch(reloadPosts(data))
    navigate('/')
}

export const getPostsFunc = (pagenum) => async (dispatch) => {
    dispatch(loadingPost())
    const { data } = await getPostsRequest(pagenum)
    dispatch(getPosts(data))
    dispatch(loadedPost())
}

export const editPostFunc = (post, navigate) => async (dispatch) => {
    const { data } = await updatePostRequest({ ...post })
    dispatch(editPost(data))
    navigate('/')
}

export const getPostFunc = (id) => async (dispatch) => {
    const { data } = await getPostRequest(id)
    dispatch(getPost(data[0]))
}

export const getUserPostFunc = (id) => async (dispatch) => {
    const { data } = await getUserPostRequest(id)
    dispatch(getUserPost(data))
}

export const deletePostFunc = (id, navigate) => async (dispatch) => {
    const data = await deletePostRequest({ id })
    dispatch(deletePost(id))
    navigate('/')
}


export const getSearchedPost = () => async (dispatch) => {
        const { data } = await searchPostRequest("animal", "none")
}


export const likePostFunc = (postid) => async (dispatch) => {
    const { data } = await likePostRequest(postid)
}


