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
            name: req.body.post.name,
            brand: req.body.post.brand,
            price: req.body.post.price,
            category: req.body.post.category,
            // currency: req.body.post.currency,
            description: req.body.post.description,
            userId: req.userId,
        })
        try {
            // console.log("uploading prod")
            const prod = await newProduct.save()
            // console.log("uploaded prod")
            const imgArray = new Image({
                imageData: req.body.results,
                prodId: prod._id
            })
            // console.log("uploading img")
            const img = await imgArray.save()
            // console.log("uploaded image")
            res.json({auth: true, message:"Posted"})
        } catch (error) {
            // console.log(error)
            res.json({auth:false, error: error})
        }
        // res.send("Posted")
    })
router.route("/qwe").get((req, res) => { res.send("wr") })
router
    .route("/products")
    .get(verifyJWT, async (req, res) => {
        // const userId = req.userId
        // console.log("called")
        try {
            const prods = await Product.find({ userId: req.userId })
            res.json({ auth: true, message: "Your Products", prods })
        } catch (error) {
            console.log(error)
        }
    })

router
    .route("/product/delete/:id")
    .delete(async (req, res) => {
        try {
            const result = await Product.findByIdAndDelete(req.params.id)
            // console.log(result)
            res.json({ auth: true })
        } catch (error) {
            res.json({ auth: false, error: error })
        }

    })

router
    .route("/product/:id")
    .get(async (req, res) => {
        const id = req.params.id
        try {
            const prod = await Product.findById(id)
            // console.log(prod)
            const imgArray = await Image.findOne({ prodId: id })
            // console.log(imgArray)
            res.json({ auth: true, message: "Product page", prod, imgArray })
        } catch (error) {
            console.log(error)
        }
    })

module.exports = router