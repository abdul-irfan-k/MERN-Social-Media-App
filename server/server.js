const express = require('express')
const app = express()
const path = require('path')
const port = 5000

const cors = require('cors')
const connect = require("./db/connection")
const bodyParser = require('body-parser')
const fileupload = require('express-fileupload')
const cookieParser = require('cookie-parser')
require('dotenv').config()

app.use(cors())
app.use(cookieParser())
app.use(bodyParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileupload({ useTempFiles: true }))
const getPostRoutes = require('./Routes/getPostRoutes')
const getUserRoutes = require('./Routes/getUserRoutes')


app.use('/post', getPostRoutes)
app.use('/user', getUserRoutes)


connect(() => {
   try {
      app.listen(port)
      console.log(`server running at http://localhost:${port}`)
   } catch (error) {
console.log(error)
   }
})
