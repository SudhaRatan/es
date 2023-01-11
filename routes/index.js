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
		var images = {}
		const prom = prods.map(async element => {
			const img = await Image.findOne({ prodId: element._id })
			const imgdata = await img.imageData[0]
			const id = element._id
			images[id] = imgdata
		})

		await Promise.all(prom)
		const data = {
			prods: prods,
			images: images,
		}
		// console.log(prods)
		console.log("----------------------")
		res.json(data)
	})
module.exports = router