const userSchema = require('../../Models/UserSchema')
const bcrypt = require('bcrypt')
const PostSchema = require('../../Models/PostSchema')
const { default: mongoose } = require('mongoose')
const { sendOtpFunc, verifyOtpFunc } = require('../otp/otphelper')
const { jwtSignHandler } = require('../../Helpers/Jwthelper')
const ObjectId = mongoose.Types.ObjectId

const signup = async (req, res) => {
    try {
        console.log(req.url)
        const { name, email, password, confirmPassword, otp } = req.body

        const inputCritiria = req.body.name.toString().length > 3 && req.body.email.toString().length > 4
        if (!inputCritiria) return res.JSON({ isValid: false, errorType: 'NAMEANDEMAIL' })

        const exisitingUser = await userSchema.findOne({ email: `${email}` })
        if (exisitingUser !== null) return res.json({ isValid: false, errorType: 'ALREADYHAVEUSER' })

        const passwordmatched = password === confirmPassword
        if (!passwordmatched) return res.JSON({ isValid: false, errorType: 'PASSWORDMATCH' })

        console.log(otp, email)
        const { isCorrectOTP } = await verifyOtpFunc(email, otp)
        if (!isCorrectOTP) return res.json({ isValid: false, errorType: 'OTPVERIFY' })


        const hashedpassword = await bcrypt.hash(password, 12)
        const schema = new userSchema({ name, email, password: hashedpassword })
        const user = await schema.save()

        await jwtSignHandler(user, 'acessToken', '1h', res)
        await jwtSignHandler(user, 'refreshToken', '1d', res)

        res.json({ isValid: true, user })
        req.files?.profileImage?.mv(`../client/public/userimage/${user._id}.jpg`)
    } catch (error) {
        console.log(error)
    }
}

const login = async (req, res) => {
    try {
        console.log(req.url)
        const { email, password } = req.body

        const user = await userSchema.findOne({ email })
        if (user == null) return res.json({ isValid: false, errorType: 'NOTUSERFOUND' })

        const correctPasword = await bcrypt.compare(password, user.password)
        if (!correctPasword) return res.json({ isValid: false, errorType: 'INCORRECTPASSWORD' })

        await jwtSignHandler(user, 'acessToken', '1h', res)
        await jwtSignHandler(user, 'refreshToken', '1d', res)
        delete user.password
        res.json({ user, isValid: true })
    } catch (error) {
        console.log(error)
    }
}

const logout = (req, res) => {
    console.log(req.url)
    res.clearCookie('acessToken')
    res.clearCookie('refreshToken')
    res.send()
}

const edituser = async (req, res) => {
    console.log(req.url)
    const id = req._id
    const image = req?.files?.userImage

    const userdetail = req.body
    const data = await userSchema.findByIdAndUpdate(id, userdetail, { new: true })

    res.send(data)
    image?.mv(`../client/public/userimage/${data.id}.jpg`)
}

const deleteUser = async (req, res) => {
    try {
        console.log(req.url)
        const userid = req._id

        await userSchema.findByIdAndDelete(userid)
        await PostSchema.deleteMany({ ['creator.id']: userid })

        res.clearCookie('acessToken')
        res.clearCookie('refreshToken')
        res.send()
    } catch (error) {
        console.log(error)
    }
}


const sendotp = async (req, res) => {
    try {
        console.log(req.url)
        email = req.email || req.body.email
        console.log(email)
        const { isOtpSended } = await sendOtpFunc(email)
        res.json({ isOtpSended })
    } catch (error) {
        console.log(error)
        // if (error.message == 'No recipients defined') 
        res.json({ isOtpSended: false, validEmail: false })
    }
}



const getOtherUserDetail = async (req, res) => {
    try {
        console.log(req.url)
        const username = req.query?.username
        const id = req.body?.id

        const data = await userSchema.aggregate([
            { $match: { $or: [{ name: username }, { _id: ObjectId(id) }] } },
            { $project: { name: "$name", email: "$email", _id: "$_id", followsDetail: "$followsDetail", createdAtL: "$createdAtL" } }
        ])
        return res.send(data)
    } catch (error) {
        console.log("new error ", error)
    }
}

const getRandomUser = async (req, res) => {
    try {
        console.log(req.url)
        const data = await userSchema.find({
            $expr: { $lt: [0.5, { $rand: {} }] }
        })
        return res.send(data)
    } catch (error) {
        console.log(error)
    }
}



const verifyOtp = async (req, res) => {
    try {
        const otp = req.body.otp
        const email = req.body.email

        const { isCorrectOTP } = await verifyOtpFunc(email, otp)
        return res.json({ isCorrectOTP })
    } catch (error) {
        console.log(error)
    }
}



const resetPassword = async (req, res) => {
    try {
        console.log(req.url)
        const { oldPassword, newPassword, newComfirmPassword } = req.body
        const userid = req._id

        if (newPassword !== newComfirmPassword) return res.json({ isPasswordUpdated: false, errorType: 'PASSWORDNOTMATCHED' })
        if (oldPassword == newPassword) return res.json({ isPasswordUpdated: false, errorType: 'PASSWORDNOTCHANGED' })

        const user = await userSchema.findById(userid)
        const isCorrectPassword = await bcrypt.compare(oldPassword, user.password)
        if (!isCorrectPassword) return res.json({ isPasswordUpdated: false, errorType: 'INCORRECTPASSWORD' })

        const newHashedPassword = await bcrypt.hash(newPassword, 12)
        const newUser = await userSchema.findByIdAndUpdate(userid, { password: newHashedPassword }, { new: true })
        res.json({ isPasswordUpdated: true })
    } catch (error) {
        console.log(error)
    }
}

const resetPasswordwithotp = async (req, res) => {
    try {
        console.log(req.url)
        const { newPassword, newComfirmPassword, otp } = req.body
        const userid = req._id
        const { isCorrectOTP } = await verifyOtpFunc(req.email, otp)
        if (!isCorrectOTP) return res.json({ isPasswordUpdated: false, errorType: 'INVALIDOTP' })
        if (newPassword != newComfirmPassword) return res.json({ isPasswordUpdated: false, errorType: 'PASSWORDNOTMATCHED' })

        const user = await userSchema.findById(userid)
        const isSamePassword = await bcrypt.compare(newPassword, user.password)
        if (isSamePassword) return res.json({ isPasswordUpdated: false, errorType: 'PASSWORDNOTCHANGED' })

        const hashedPassword = await bcrypt.hash(newPassword, 12)
        const data = await userSchema.findByIdAndUpdate(userid, { password: hashedPassword }, { new: true })
        res.json({ isPasswordUpdated: true })
    } catch (error) {
        console.log(error)
    }
}



const addFollower = async (req, res) => {
    try {
        console.log(req.url)
        const userid = req._id
        const followuserid = req.body.followuserid

        const a = await userSchema.aggregate([
            { $match: { _id: ObjectId(userid) } },
            { $lookup: { from: "users", pipeline: [{ $match: { _id: ObjectId(followuserid) } }, { $project: { name: 1, email: 1, followsDetail: 1 } }], as: "followinguserdetail" } },
            { $project: { follws: 1, followinguserdetail: 1, _id: 1, followsDetail: 1 } }
        ])

        const userdetails = a[0]
        const followinguserdetail = a[0].followinguserdetail[0]

        if (userdetails == null) return res.json({ isLiked: false, errorType: 'NOTUSERFOUND' })
        const index = userdetails.followsDetail.following.findIndex(id => id === followuserid)
        if (index === -1) {
            userdetails.followsDetail.following.push(followuserid)
            followinguserdetail.followsDetail.followers.push(userid)
        }
        else {
            userdetails.followsDetail.following = userdetails.followsDetail.following.filter(id => id !== followuserid)
            followinguserdetail.followsDetail.followers = followinguserdetail.followsDetail.followers.filter(id => id !== userid)
        }

        const data = await userSchema.findByIdAndUpdate(userid, {
            $set: { "followsDetail.following": userdetails.followsDetail.following }
        }, { new: true })

        const data1 = await userSchema.findByIdAndUpdate(followuserid, {
            $set: { "followsDetail.followers": followinguserdetail.followsDetail.followers }
        }, { new: true })

        res.json({ isLiked: true })
    } catch (error) {
        console.log(error)
    }
}
module.exports = {
    signup,
    login,
    logout,
    edituser,
    sendotp,
    deleteUser,
    getOtherUserDetail,
    getRandomUser,
    addFollower,
    resetPassword,
    verifyOtp,
    resetPasswordwithotp
}


