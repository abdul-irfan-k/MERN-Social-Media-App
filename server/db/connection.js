const mongoose = require('mongoose')



const url = 'mongodb://127.0.0.1:27017/test'

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
async function connect(callBackFunc) {
    try {
        mongoose.connect(process.env.MONGODB_URL || url, connectionParams)
        console.log("Data base coonected ")
        callBackFunc()
    } catch (error) {
        console.log(error)
    }
}
module.exports = connect

