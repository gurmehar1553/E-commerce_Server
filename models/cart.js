const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
        category : String,
        description : String,
        id : Number,
        image : String,
        price : Number,
        rating : {
            rate : Number,
            count : Number
        },
        title : String
    
})

module.exports = mongoose.model("Cart",cartSchema)