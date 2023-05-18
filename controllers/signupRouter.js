const signupRouter = require('express').Router();
const mongoose = require('mongoose')
const User = require('../models/user')
const bcrypt = require('bcrypt')

signupRouter.post('/',async (req,res) => {
    const {username,email,password} = req.body;
    const user = await User.find({username})
    if(user.username || user.email ){
        return res.send(false)
    }
    const saltRounds = 10
    const pwdHash = await bcrypt.hash(password,saltRounds)
    const newUser = new User({
        username,
        email,
        password : pwdHash
    })
    const savedUser = await newUser.save()
    res.send(true)
})

module.exports = signupRouter