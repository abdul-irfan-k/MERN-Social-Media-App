const express = require('express')
const router = express.Router()
const { CheckAuthantication } = require('../MIddleware/Middleware')
const { signup, login, edituser, sendotp, deleteUser,
    getRandomUser, addFollower,
    verifyOtp,
    resetPassword,
    getOtherUserDetail,
    logout,
    resetPasswordwithotp } = require('../Controllers/user/user')

router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', CheckAuthantication, logout)
router.post('/edituser', CheckAuthantication, edituser)
router.post('/deleteuser', CheckAuthantication, deleteUser)

router.post('/searchuser', getOtherUserDetail) // user search
router.post('/getotheruserdetail', getOtherUserDetail)
router.post('/followuser', CheckAuthantication, addFollower) // user follow and followers
router.post('/getrandomuser', getRandomUser) // get recomended user  

router.post('/sendotp', sendotp)
router.post('/verifyotp', verifyOtp)                        // verifying otp for reset password 
router.post('/resetpasswordwithotp', CheckAuthantication, resetPasswordwithotp)     // reseting password with otp

router.post('/resetpassword', CheckAuthantication, resetPassword)                   // reseting password with old password 



module.exports = router
