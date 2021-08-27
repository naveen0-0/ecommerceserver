const router = require('express').Router()
const { checkToken } = require('../middleware/middleware')
const Product = require('../models/Product')
const User = require('../models/User')

//* Adding a new product to the database
//* Only Accessible to the admin
router.route('/newproduct').post(checkToken,async (req,res) => {
    const { title, description, price, category, image } = req.body
    const { username } = req.user;
    if(username === process.env.ALLOWED_USER){
        try {
            await Product.create({ title, description, price, category, image })
            res.send({ statusload: true, msg:"product added successfully"})
        } catch (error) {
            res.send({ statusload: false })
        }
    }
    return res.send({ statusload: false, msg:"You are not allowed to add a product" })
})

//* Getting all products
router.route('/products').get(async (req,res) => {
    try {
        const products = await Product.find()
        res.send({ statusload:true, products:products })
    } catch (error) {
        res.send({ statusload:false })
    }
})

//* Getting a single product
router.route('/product/:id').get( async (req,res) => {
    try {
        const product = await Product.findOne({ _id:req.params.id })
        res.send({ statusload:true, product:product })
    } catch (error) {
        res.send({ statusload:false })
    }
})

//*Add a product to cart
router.route('/cart/add').post(checkToken,async (req,res)=>{
    const { productId } = req.body;
    let user = await User.findOne({ username:req.user.username, cart : { $elemMatch : { productId:productId }}})
    if(user){
        try {
            await User.updateOne({ username : req.user.username,cart:{ $elemMatch : { productId:productId}}},{
                $inc:{"cart.$.noofProducts":1}
            })

            User.findOne({ username : req.user.username }).then(data => {
                res.send({ cart : data.cart })
            })
        } catch (error) {
            res.send("Error increasing the noofProducts")
        }
    }else{
        try {
            await User.updateOne({ username: req.user.username },{
                $push : {
                    "cart":{
                        "productId":productId,
                        "noofProducts":1
                    }
                }
            })
            User.findOne({ username : req.user.username }).then(data => {
                res.send({ cart : data.cart })
            })
        } catch (error) {
            res.send("Error Inserting the product into the cart")
        }
    }
})

//* Remove a product from cart
router.route('/cart/remove').post(checkToken, async (req,res) => {
    const { productId } = req.body;
    let user = await User.findOne({ username:req.user.username, cart : { $elemMatch : { productId:productId,noofProducts : { $gt : 1 } }}})
    if(user){
        try {
            await User.updateOne({ username : req.user.username,cart:{ $elemMatch : { productId:productId}}},{
                $inc:{"cart.$.noofProducts":-1}
            })
            User.findOne({ username : req.user.username }).then(data => {
                res.send({ cart : data.cart })
            })
        } catch (error) {
            res.send("Error decreasing the noofProducts")
        }
    }else{
        try {
            await User.updateOne({ username: req.user.username },{
                $pull : {
                    "cart":{
                        "productId":productId,
                    }
                }
            })
            User.findOne({ username : req.user.username }).then(data => {
                res.send({ cart : data.cart })
            })
        } catch (error) {
            res.send("Error Removing the product into the cart")
        }
    }
})

module.exports = router;