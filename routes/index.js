const express = require('express')
const router = express.Router()
const params = require('url')
const Product = require("../models/product")
const Image = require("../models/image")

require('dotenv').config()

router
	.route(["/", "/home"])
	.get((req, res) => {
		const q = params.parse(req.url, true)
		// console.log(q)
		res.redirect(process.env.FRONT_END_URL + q.path)
	})

router
	.route("/featProd")
	.get(async (req, res) => {
		const featProduct = await Product.aggregate([
			{ $sample: { size: 1 } }
		])
		const id = featProduct[0]._id
		const imgdata = await Image.findOne({ prodId: id })
		res.json({ featProd: featProduct, imgData: imgdata })
	})

router
	.route("/electronicProds")
	.get(async (req, res) => {
		const prods = await Product.aggregate([
			{ $sample: { size: 5 } }
		])
		// console.log("----------------------")
		res.json({ prods: prods })
	})

router
	.route('/search/:product')
	.get(async (req, res) => {

		const result = await Product.find({ $or: [
			{ name: { $regex: req.params.product, $options: 'si' } },
			{ category: { $regex: req.params.product, $options: 'si' } },
			{ subcategory: { $regex: req.params.product, $options: 'si' } },
			{ brand: { $regex: req.params.product, $options: 'si' } },
		] })
		res.json(result)
	})

module.exports = router