require('dotenv').config()
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const authorization = (req,res,next) => {
    const authHeader = req.get('Authorization')
    console.log("authHeader : ",authHeader)
    const token  = authHeader && authHeader.split(' ')[1]
    console.log("token : ",token)
    if(token === null){
        res.json({authStatus:false, user:null,err:"There is no token"})
        return
    }
    jwt.verify(token,process.env.SECRET, async (err,user) => {
        console.log("user : ",user)
        if(err){
            res.json({authStatus:false,user:null,err:err.message})
            return
        }
        const reqUser = await User.findOne({username : user.username})
        req.authData = {authStatus : true, user: reqUser, err:null}
        next()
    })
}

module.exports = authorization