const { Schema, model } = require('mongoose')

const RequiredString = { type:String, required:true }

const productSchema = new Schema({
    title:RequiredString,
    price:{
        type:Number,
        required:true
    },
    description:RequiredString,
    category:RequiredString,
    image:RequiredString,
})

const Product = model('product',productSchema)
module.exports = Product