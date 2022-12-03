const express = require("express")
const router = express.Router()
const verifyJWT = require("../auth/auth")
const Product = require("../models/product")
const Image = require("../models/image")

router
    .route("/upload")
    .get(verifyJWT, (req, res) => {
        res.json({ auth: true, message: "Upload a Product" })
    })
    .post(verifyJWT, async (req, res) => {
        // console.log(req.body.post)
        const newProduct = new Product({
            name : req.body.post.name,
            brand : req.body.post.brand,
            price : req.body.post.price,
            currency : req.body.post.currency,
            description : req.body.post.description,
        })

        

        try {
            console.log("uploading prod")
            const prod = await newProduct.save()
            console.log("uploaded prod")
            const imgArray = new Image({
                imageData : req.body.results,
                prodId : prod._id
            })
            console.log("uploading img")
            const img = await imgArray.save()
            console.log("uploaded image")
            res.send("posted")
        } catch (error) {
            console.log(error)
        }
    })

module.exports = router