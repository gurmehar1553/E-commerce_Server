require("dotenv").config()
const express = require("express");
const app = express();
const path=require('path')
const morgan = require('morgan')
const loginRouter = require('./controllers/loginRouter')
const signupRouter = require('./controllers/signupRouter')
const cartRouter = require('./controllers/cartRouter')
const mongoose = require('mongoose')
const cors = require('cors')

app.use(cors())
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('tiny'));
  }

mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
    console.log("Database connected")
})
.catch((e)=>{
    console.log(e)
})
app.use(express.static('build'))
app.use(express.json())
app.use('/login',loginRouter)
app.use('/signup',signupRouter)
app.use('/addToCart',cartRouter)

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname, '/build/index.html'))
})

const PORT = process.env.PORT || 3050

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})