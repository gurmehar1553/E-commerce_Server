const cartRouter = require('express').Router()
const { default: mongoose } = require('mongoose')
const User = require('../models/user')
const Cart = require('../models/cart')
const authorization = require('../utils/middleware')

cartRouter.get('/', async (req,res) => {
    const data = await Cart.find({})
    res.json(data)
})

cartRouter.post('/' ,async (req,res) => {
    const {cardData,size,qty,currUser} = req.body
    const cart = await Cart.findById(cardData._id)
    console.log(cart)
    const user = await User.findOne({username : currUser.username})
    user.cartArray.push({cardData : cart._id,size,qty})
    await user.save()
    console.log(user)
    res.send('Ok')
})

cartRouter.post('/remove', async (req,res)=>{
    const {cardData,size,qty,currUser} = req.body
    const user = await User.findOne({username : currUser.username})
    user.cartArray = (user.cartArray).filter(ele => {
        console.log(ele.cardData._id)
        console.log(new Object(cardData._id))
        return ele.cardData._id != cardData._id
    })
    await user.save()
    console.log(user)
    res.send('Deleted')
})

cartRouter.delete('/removeAll', authorization , async (req,res) => {
    const currUser = req.authData.user
    const user = await User.findOne({username : currUser.username})
    user.cartArray = []
    await user.save()
    console.log(user)
    res.send("Done")
})

cartRouter.get('/cart',authorization, async (req,res) => {
    const currUser = req.authData.user
    const user = await User.findOne({username : currUser.username}).populate({path : 'cartArray',populate : 'cardData'})
    console.log(user.cartArray)
    res.json(user.cartArray)
})

module.exports = cartRouter