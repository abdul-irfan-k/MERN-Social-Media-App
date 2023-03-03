const jwt = require('jsonwebtoken')

const jwtSignHandler = async (user, tokenName, expiresIn, res) => {
    const secret = tokenName == 'acessToken' ? process.env.JWT_ACESS_TOKEN_SECRET : process.env.JWT_REFRESH_TOKEN_SECRET
    const token = await jwt.sign({ name: user.name, email: user.email, _id: user._id }, secret, { expiresIn })
    res.cookie(tokenName, token, { httpOnly: true, somesite: "strict", expires: new Date((Date.now() + (60000 * 60 * 24))) })
}


module.exports = {
    jwtSignHandler
}