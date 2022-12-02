require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require("cors");
const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions))
// const json = require('json')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
// DB setup
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    family: 4,
})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log("Connected to mongoose"))


// Include Routes
const index = require('./routes/index')
const login = require('./routes/login')
const cart = require('./routes/cart')
const sell = require('./routes/sell')

//use routes
app.use("/", index)
app.use("/login", login)
app.use("/cart", cart)
app.use("/sell",sell)

app.listen(process.env.PORT, function () {
    console.log("Server running on port " + this.address().port)
})