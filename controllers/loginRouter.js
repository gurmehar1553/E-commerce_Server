require('dotenv').config()
const loginRouter = require('express').Router()
const User = require('../models/user')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authorization = require('../utils/middleware')

loginRouter.get('/',authorization , (req,res) => {
    const {authData} = req
    const {authStatus,user,err} = authData
    if(!authStatus){
        res.json({authStatus, user:null,err})
    }
    else{
        res.json({authStatus,user,err})
    }
})


loginRouter.post('/',async (req,res)=>{
    const {username,password} = req.body;
    const user = await User.findOne({username})
    console.log(user)
    if(user !== null){
        const checkPwd = await bcrypt.compare(password,user.password)
        const tokenForUser = {
            username : user.username,
            id:user._id
        }
        const token = jwt.sign(tokenForUser, process.env.SECRET)
        if(checkPwd){
            return res.send({token,user})
        }
        else{
            return res.status(401).json({
                error:"Username or password not valid"
            })
        }
    }
    else{
        return res.status(401).json({
            error:"Username or password not valid"
        })
    }
})

module.exports = loginRouter