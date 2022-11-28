if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
// const json = require('json')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
// DB setup
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser:true,
    family:4,
})
const db = mongoose.connection
db.on('error',error => console.error(error))
db.once('open', () => console.log("Connected to mongoose"))


// Include Routes
const index = require('./routes/index')
const login = require('./routes/login')
const cart = require('./routes/cart')

//use routes
app.use("/",index)
app.use("/login",login)
app.use("/cart",cart)

app.listen(process.env.PORT, function () {
    console.log("Server running on port " + this.address().port)
})