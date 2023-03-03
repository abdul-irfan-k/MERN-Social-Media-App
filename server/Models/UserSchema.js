const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    followsDetail: {
        followers: {
            type: [String], default: []
        },
        following: {
            type: [String], default: []
        }
    },
    createdAt: { type: String, default: new Date().toDateString() }
})

module.exports = mongoose.model('User', userSchema)