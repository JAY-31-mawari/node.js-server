require('dotenv').config()
const express=require('express')
const app=express()
const port=process.env.PORT || 4000
const router=require('./routes/route')
const cors=require('cors')
const bodyParser=require('body-parser')
const connectDB = require('./db/connect')
const path=require('path')
const cookieParser=require('cookie-parser')
const event=require('events')
const eventEmitter=new event.EventEmitter()
const url=require('url')
const fs=require('fs')
const http=require('http')

app.use(cors())
app.use(express.json())
app.use(cookieParser())


app.get("/getcookie",(req,res)=>{
    res.send(req.cookies)
})

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname)+'/main.html')
})

app.get("/login",(req,res)=>{
    res.sendFile(path.join(__dirname)+'/login.html')
})

app.use('/api/v1',router)
app.use('*',(req,res)=>{
    res.send('<h1>Route Does not exist</h1>')
})

const start = async(req,res) => {
    console.log('This function is fired by the event handler')
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port,()=>{console.log(`server is successfully running on ${port}`)})
    } catch (error) {
        console.log(error)
    }
}

start()

eventEmitter.on('scream',()=>{
    console.log('I hear a scream')
})
eventEmitter.emit('scream')