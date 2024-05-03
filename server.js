const express = require ('express')
const server = express()
const port = process.env.PORT || 3000;
const routerbooks = require ('./Routes/books.routers')
const userRouter = require ('./Routes/users.routes')

const cookieParser = require('cookie-parser');
require('dotenv').config()

server.use(cookieParser())
server.use(express.json())
server.use(express.urlencoded({extended:true}))

server.set ('view engine','ejs')


server.use('/',routerbooks)
server.use('/',userRouter)



server.listen(port,()=>{
    console.log('listening on port '+port)
})

