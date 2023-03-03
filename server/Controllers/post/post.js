const postSchema = require('../../Models/PostSchema')
const ObjectId = require('mongoose').Types.ObjectId


const getPosts = async (req, res) => {
    try {
        console.log(req.url)
        let { page } = req.query
        let skip = Math.ceil((page - 1) * 5)

        let data = await postSchema.aggregate([
            { $sort: { 'createdat': -1 } },
            { $skip: skip | 0 },
            { $limit: 5 },
            { $lookup: { from: 'users', let: { creatorid: "$creator.id" }, pipeline: [{ $match: { $expr: { $eq: ['$_id', { $toObjectId: '$$creatorid' }] } } }, { $project: { name: 1, email: 1, _id: 1 } },], as: "creatorDetail" } },
            { $project: { _id: 1, Title: 1, Content: 1, Hashtag: 1, likes: 1, createdat: 1, creatorDetail: 1 } }
        ])
        data = [...data]
        res.send(data)
    } catch (error) {
        console.log(error)
    }
}


const getPost = async (req, res) => {
    try {
        console.log(req.url)
        id = req.params?.id
        const tag = req.query?.tag ? req.query.tag : null
        const title = req.query?.title ? req.query.title : null

        const data = await postSchema.aggregate([
            { $match: { $or: [{ _id: ObjectId(id) }, { Hashtag: tag }, { Title: title | null }] } },
            { $lookup: { from: 'users', let: { creatorid: "$creator.id" }, pipeline: [{ $match: { $expr: { $eq: ['$_id', { $toObjectId: '$$creatorid' }] } } }, { $project: { name: 1, email: 1 } },], as: 'creatorDetail' } },
            { $sort: { createdat: - 1 } },
            { $project: { Title: 1, Hashtag: 1, Content: 1, likes: 1, createdat: 1, creatorDetail: 1 } }
        ])

        res.json(data)
    } catch (error) {
        console.log(error)
    }
}

const addPost = async (req, res) => {
    try {
        console.log(req.url)
        const post = req.body

        post.creator = { id: req._id }
        post.createdat = new Date().toISOString()

        const postSchemas = new postSchema({ ...post })
        let data = await postSchemas.save()

        res.send(data)
        req.files.FileURL.mv(`../client/public/postimage/${data.id}.jpg`)
    } catch (error) {
        console.log(error)
    }
}

const editPost = async (req, res) => {
    try {
        console.log(req.url)
        const { _id } = req.body
        const post = req.body

        const data = await postSchema.findOneAndUpdate({ _id, 'creator.id': req._id }, { ...post }, { new: true })
        res.send(data)
        req?.files?.FileURL?.mv(`../client/public/postimage/${data.id}.jpg`)
    } catch (error) {
        console.log(error)
    }
}

const deletePost = async (req, res) => {
    try {
        console.log(req.url)
        const { id } = req.body
        const userid = req?._id
        const data = await postSchema.findOneAndRemove({ _id: id, 'creator.id': userid })
        res.send(data)
    } catch (error) {
        console.log(error)
    }
}



const addLike = async (req, res) => {
    try {
        console.log(req.url)
        const userid = req?._id
        const { postid } = req.body
        const post = await postSchema.findById(postid)

        const index = post.likes?.likelist?.findIndex((id) => id === userid)
        if (index == -1) {
            post.likes.likelist.push(userid)
            post.likes.likeCount += 1
        }
        else {
            post.likes.likeCount -= 1
            post.likes.likelist = post.likes.likelist.filter((id) => id !== userid)
        }

        const updatepost = await postSchema.findByIdAndUpdate(postid, post, { new: true })
        return res.json("added like ")
    } catch (error) {
        console.log("error ", error)
    }
}


const getUserPost = async (req, res) => {
    try {
        console.log(req.url)
        const { id } = req.params
        const data = await postSchema.find({ "creator.id": ObjectId(id) }).sort({ createdat: -1 })
        return res.json(data)
    } catch (error) {
        console.log(error)
    }
}
module.exports = {
    getPosts,
    editPost,
    deletePost,
    getPost,
    addPost,
    addLike,
    getUserPost
}