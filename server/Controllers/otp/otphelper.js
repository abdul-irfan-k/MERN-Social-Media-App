const nodemailer = require('nodemailer')
const OTPGenerator = require('otp-generator')
const OTPSchema = require('../../Models/OTPSchema')
const bcrypt = require('bcrypt')

const sendOtpFunc = async (email) => {

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD
            }
        })

        let otp = await OTPGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false })

        const mailContainer = {
            from: process.env.EMAIL,
            to: `${email}`,
            subject: "Email Verification",
            text: `You are otp is : ${otp} \n please don't send you are otp to others! `
        }

        const sendmail = await transporter.sendMail(mailContainer)
        const newOTP = await bcrypt.hash(otp, 10)

        await OTPSchema.deleteMany({ email: `${email}` })
        const OTP = new OTPSchema({ email, otp: newOTP })
        const data = await OTP.save()
        return { isOtpSended: true }
    } catch (error) {
        return { isOtpSended: false }
    }
}


const verifyOtpFunc = async (email, otp) => {
    const data = await OTPSchema.findOne({ email: `${email}` })
    if (!data) return ({ isCorrectOTP: false, message: "sorry there no otp request" })
    else {
        const correctOTP = await bcrypt.compare(otp, data.otp)
        console.log(otp,data.otp,correctOTP)
        if (!correctOTP) return ({ isCorrectOTP: false })
        if (correctOTP) return ({ isCorrectOTP: true })
    }
}


module.exports = {
    sendOtpFunc,
    verifyOtpFunc
}
