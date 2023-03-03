const { json } = require('body-parser')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchemas = new Schema({
    Title: String,
    Content: String,
    Hashtag: String,
    creator: {
        id: String
    },
    likes: {
        likeCount: { type: Number, default: 0 },
        likelist: { type: [String], default: [] }
    },
    createdat: { type: String, default: new Date().toISOString() }
})

module.exports = mongoose.model('Post', postSchemas)