const express = require('express')
const router = express.Router()
const verifyJWT = require("../auth/auth")
const cart = require("../models/cart")
const Product = require("../models/product")
const Image = require("../models/image")

router
	.route("/")
	.get(verifyJWT, async (req, res) => {
		try {
			const products = await cart.findOne({ userId: req.userId }).populate('productIds')
			// console.log(products)
			res.json({ auth: true, message: "Cart page", prods: products })
		} catch (error) {
			console.log(error)
		}
	})
	.put(verifyJWT, async (req, res) => {
		// console.log(req.body)
		try {
			const userCart = await cart.findOne({ userId: req.userId })
			// console.log(userCart)
			if (userCart == null) {
				// console.log("Empty cart creating cart object")
				const newCart = new cart({
					userId: req.userId,
					productIds: req.body.id
				})
				const result = await newCart.save()
				// console.log(result)
			} else {
				const result = await cart.updateOne({
					userId: req.userId
				}, {
					$push: { productIds: req.body.id }
				})
				// console.log(result)
			}
			res.json({ auth: true, message: "Added to Cart" })
		} catch (error) {
			// console.log(error)
			res.json({ auth: false, error: error })
		}
	})

router
	.route("/images/:id")
	.get(verifyJWT, async (req, res) => {
		try {
			const cartItems = await cart.findById(req.params.id)
			const prodIds = cartItems.productIds
			var images = {}
			const prom = prodIds.map(async element => {
				const img = await Image.findOne({ prodId: element })
				const imgdata = await img.imageData[0]
				const id = element._id
				images[id] = imgdata
			})

			await Promise.all(prom)
			res.json({auth : true, images})
		} catch (error) {
			console.log(error)
		}
	})

router
	.route("/removePRoduct/:id")
	.delete(verifyJWT,async(req,res) => {
		// console.log(req.params)
		try {
			const result = await cart.updateOne({userId : req.userId},{
				$pull : {'productIds' : req.params.id}
			})
			res.json({auth: true, message: "deleted"})
		} catch (error) {
			console.log(error)
			res.json({auth:false, message : "Error..please try again"})
		}
		
	})

module.exports = router
