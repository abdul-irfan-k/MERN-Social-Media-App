const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OTPSchema = new Schema({
    email: {
        type: String
    },
    otp: {
        type: String
    },
    createdAt: { type: Date, default: Date.now, index: { expires: 300 } }
})

module.exports = mongoose.model('Otp', OTPSchema)