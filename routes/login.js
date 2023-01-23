const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

router
    .route("/")
    .get((req, res) => {
        res.json({login:"login page"})
    })
    .post(async (req, res) => {
        try {
            const phone = req.body.number
            const password = req.body.password
            // console.log("req received")
            const user = await User.findOne({ phone: phone })
            if (user) {
                if (await bcrypt.compare(req.body.password, user.password)) {
                    // res.send("Authenticated")
                    // const id = user._id
                    const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN, {
                        // expiresIn: 60 * 60,
                    })
                    req.user = user._id
                    res.json({ auth: true, token: token, user: user._id })
                } else {
                    res.send("Incorrect password")
                }
            } else {
                res.send("User not found")
            }

            // console.log(user)
        } catch (error) {
            console.log(error)
        }
    })


router
    .route("/signup")
    .get((req, res) => {
        res.send("Signup page")
    })
    .post(async (req, res) => {
        try {
            const pass = await bcrypt.hash(req.body.password, 10)
            const newUser = new User({
                name: req.body.name,
                phone: req.body.number,
                password: pass
            })
            const user = await User.findOne({ phone: newUser.phone })
            if (user) {
                res.json({ error: "User already exists" })
            } else {
                const result = await newUser.save()
                res.json({ status: true })
            }


        } catch (error) {
            console.log(error)
            res.json({ error: "Fill all fields" })
        }

    })


module.exports = router