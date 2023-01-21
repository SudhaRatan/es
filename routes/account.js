const express = require("express")
const verifyJWT = require("../auth/auth")
const router = express.Router()
const user = require('../models/user')
const cart = require('../models/cart')
const image = require('../models/image')

router
  .route("/")
  .get(verifyJWT, async (req, res) => {
    try {
      const result = await user.findOne({ _id: req.userId }, { password: 0 })
      // console.log(result)
      res.json({ auth: true, result })
    } catch (error) {
      console.log(error)
    }
  })

router
  .route("/address")
  .get(verifyJWT, async (req, res) => {
    // const result = await 
  })
  .post(verifyJWT, async (req, res) => {
    // console.log(req.body)
    const data = req.body
    if (data.country != "" && data.fullName != "" && data.phoneNumber != "" && data.address != "" && data.city != "" && data.state != "" && data.zip != "") {
      try {
        const result = await user.updateOne({ _id: req.userId }, {
          $push: { addresses: req.body }
        })
        // console.log(result)
        res.json({ auth: true })
      } catch (error) {
        res.json({ auth: false, error })
      }
    } else {
      res.json({ auth: false, message: "Fill all fields" })
    }
  })

router
  .route("/verify")
  .get(verifyJWT, (req, res) => {
    res.json({ auth: true })
  })

router
  .route("/buy")
  .post(verifyJWT, async (req, res) => {
    // console.log(req.body)
    try {
      const addresses = await user.findOne({ _id: req.userId }, { addresses: 1 })
      const address = addresses.addresses[req.body.info.index]
      // console.log(address, req.body.info.prods)
      var productIds = []
      req.body.info.prods.map(prod => {
        productIds.push(prod._id)
      })
      // console.log(productIds)
      const result = await user.updateOne({ _id: req.userId }, {
        $push: {
          orders: {
            productIds: productIds,
            method: req.body.method,
            address: address,
          }
        }
      })
      if (req.body.info.cart) {
        const resss = await cart.updateOne({ userId: req.userId }, {
          $set: { productIds: [] }
        })
      }
      res.json({ auth: true, message: "Order Placed" })
      // console.log(result)
    } catch (error) {
      // console.log(error)
      res.json({ auth: false, message: "Something went wrong try again later" })
    }
  })

router
  .route("/orders")
  .get(verifyJWT, async (req, res) => {
    try {
      const orders = await user.findOne({ _id: req.userId }).populate({
        path: 'orders',
        populate: 'productIds'
      })
      // console.log(orders)
      res.json({ auth: true, orders })
    } catch (error) {
      console.log(error)
    }
  })

// router
//   .route("/orders/images/:id")
//   .get(verifyJWT, async (req, res) => {
//     try {
//       console.log(req.params.id)
//       const orderItems = await user.findOne({ orders:{
//         $elemMatch : {
//           _id: req.params.id
//         }
//       }},{'orders.productIds': 1})
//       console.log(orderItems)
//     } catch (error) {
//       console.log(error)
//     }
//   })

router
  .route("/orders/image/:id")
  .get(verifyJWT, async(req,res) => {
    try {
      const Image = await image.findOne({prodId: req.params.id})
      res.json(Image.imageData[0])
    } catch (error) {
      console.log(error)
    }
  })

module.exports = router