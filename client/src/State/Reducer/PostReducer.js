import { createSlice } from '@reduxjs/toolkit'

const postSlice = createSlice({
    name: "post",
    initialState: {
        post: [],
        posts: [],
        userPost: [],
        loading: true
    },
    reducers: {
        getPosts: (state, action) => {
            state.posts = [...state.posts, ...action.payload]
            state.post = []
        },
        reloadPosts: (state) => {
            state.posts = []
            state.userPost = []
        },
        getPost: (state, action) => {
            state.post = action.payload
        },
        deletePost: (state, action) => {
            state.posts = state.posts.filter((obj) => obj._id !== action.payload)
            state.userPost = state.userPost.filter((obj) => obj._id !== action.payload)
        },
        editPost: (state, action) => {
            state.posts = state.posts.map((obj) => obj._id === action.payload._id ? { ...obj, ...action.payload } : obj)
        },
        loadingPost: (state) => {
            state.loading = true
        },
        loadedPost: (state) => {
            state.loading = false
        },
        getUserPost: (state, action) => {
            state.userPost = [...action.payload]
        }
    }

})

export default postSlice
export const { getPosts, getPost, reloadPosts, deletePost, editPost, loadingPost, loadedPost, getUserPost } = postSlice.actions