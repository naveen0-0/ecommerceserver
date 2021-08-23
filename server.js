const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const dotenv = require('dotenv')
const cors = require('cors')
const mongoose = require('mongoose')

//* Local Modules
const apiRoutes = require('./routes/api')
const authRoutes = require('./routes/auth')

//* App Initialization
const app = express()

//* Middleware
app.use(express.json())
app.use(express.urlencoded({ extended : true }))
app.use(helmet())
app.use(morgan('tiny'))
app.use(cors())
dotenv.config()


//* Routes
app.route('/').get((req,res) => {
    res.send("Welcome to Ecommerce Server Side")
})

app.use('/auth',authRoutes)
app.use('/api',apiRoutes)

//* MongoDB
const MONGO = process.env.MONGO || "mongodb://localhost/shop";
const options = { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:false }
mongoose.connect(MONGO, options)
        .then(()=> console.log("MongoDB Connection Successful"))
        .catch((err) => console.log("MongoDB Connection failure",err))


//* PORT
const PORT = process.env.PORT || 8000
app.listen(PORT,()=> console.log(`Server is running on port ${PORT}`))