const jwt = require('jsonwebtoken')
const { jwtSignHandler } = require('../Helpers/Jwthelper')

const CheckAuthantication = async (req, res, next) => {
   try {
      const { acessToken, refreshToken } = req.cookies
      const isCutomAuth = acessToken?.length < 500
      if (!acessToken || !refreshToken) return res.json({ isLogedin: false, errorType: 'NOTLOGED' })

      if (acessToken && isCutomAuth) {
         await jwt.verify(acessToken, process.env.JWT_ACESS_TOKEN_SECRET, async (err, decode) => {
            if (!err) req.username = decode?.name, req.email = decode?.email, req._id = decode?._id
            else await changeAcessToken(refreshToken, req, res)
         })
      }
      else {
         decoded = await jwt.decode(acessToken)
         req.username = decoded?.name, req.email = decoded?.email, req._id = decoded?.sub
      }

      next()
   } catch (error) {
      console.log(error)
      res.json({ isLogedin: false, errorType: 'NOTLOGED' })
   }
}


const changeAcessToken = async (refreshToken, req, res) => {
   try {
      const decoded = await jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET)
      await jwtSignHandler(decoded, 'acessToken', '1h', res)
      req._id = decoded?._id, req.username = decoded.name, req.email = decoded?.email
   } catch (error) {
      console.log(error)
   }
}

module.exports = {
   CheckAuthantication
}




