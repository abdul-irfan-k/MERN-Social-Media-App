const express = require('express')
const router = express.Router()
const { ObjectId } = require('mongoose')
const { getPosts, editPost, deletePost, getPost, addPost, addLike, getUserPost } = require('../Controllers/post/post')
const { CheckAuthantication } = require('../MIddleware/Middleware')

// multiple post request 
router.get('/getposts', getPosts)  
router.get('/getuserpost/:id', getUserPost)
router.post('/getrelatedpost', getPost)
// single post request 
router.get('/:id', getPost)
router.post('/editpost', CheckAuthantication, editPost)
router.post('/delete', CheckAuthantication, deletePost)
router.post("/addpost", CheckAuthantication, addPost)
router.post('/likepost', CheckAuthantication, addLike)

module.exports = router
