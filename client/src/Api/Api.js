import axios from 'axios'
// const url = 'http://localhost:5000'
const API = axios.create({

  headers: { 'accept': 'application/json', 'Accept-Language': 'en-US,en;q=0.8', 'Content-Type': 'multipart/form-data' },
  withCredentials: true
})

// User
export const signUpRequest = (user) => API.post('/user/signUp', user)
export const LoginRequest = (user) => API.post('/user/login', user)
export const logoutRequest = () => API.post('/user/logout')
export const editUserRequest = (details) => API.post('/user/edituser', details)
export const deleteUserRequest = () => API.post('/user/deleteuser')

export const resetPasswordRequest = (details) => API.post('/user/resetpassword', details)
export const resetPasswordWithOtpRequest  = (details) => API.post('/user/resetpasswordwithotp', details)
// export const 

export const searchUserRequest = (username) => API.post(`/user/searchuser?username=${username}`)
export const getOtherUserDetailRequest = (id) => API.post('/user/getotheruserdetail', id)
export const followUserRequest = (id) => API.post('/user/followuser', id)
export const sendOtpRequest = (email) => API.post('/user/sendotp', { email })
export const verifyOtpRequest = (details) => API.post('/user/verifyotp', details)

// Multiple Posts
export const getPostsRequest = (pagenum) => API.get(`/post/getposts?page=${pagenum}`)
export const getUserPostRequest = (id) => API.get(`/post/getuserpost/${id}`)
// Single Post Operation
export const addPostRequest = (post) => API.post('/post/addpost', post)
export const updatePostRequest = (post) => API.post('/post/editpost', post)
export const getPostRequest = (id) => API.get(`/post/${id}`)
export const likePostRequest = (postid) => API.post('/post/likepost', postid)
export const searchPostRequest = (tag) => API.post(`/post/getrelatedpost?tag=${tag}`)
export const deletePostRequest = (id) => API.post('/post/delete', id)

// otp 