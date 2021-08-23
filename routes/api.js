const router = require('express').Router()
const { checkToken } = require('../middleware/middleware')
const Product = require('../models/Product')

//* Adding a new product to the database
//* Only Accessible to the admin
router.route('/newproduct').post(checkToken,async (req,res) => {

})


module.exports = router;