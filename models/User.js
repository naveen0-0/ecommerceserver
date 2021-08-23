const { Schema, model } = require('mongoose')

const RequiredString = { type:String, required:true }
const cartSchema = new Schema({
    productId:{
        type:String,
        required:true
    },
    noofProducts:{
        type:Number,
        required:true
    }
})


const userSchema = new Schema({
    username:RequiredString,
    email:RequiredString,
    password:RequiredString,
    cart:[cartSchema]
})

const User = model('user',userSchema);

module.exports = User