const mongoose = require('mongoose');
const Cart = require('./cart')

const userSchema = new mongoose.Schema({
    username : String,
    email : String,
    password : String,
    cartArray : [{
        cardData:{
            type:mongoose.SchemaTypes.ObjectId,
            ref : "Cart"
        },
        qty : String,
        size : String
    }]
})

module.exports = mongoose.model("UserForLogin",userSchema)