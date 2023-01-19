const express = require("express")
const verifyJWT = require("../auth/auth")
const router = express.Router()
const user = require('../models/user')

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
  .get(verifyJWT, async(req,res) => {
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
  .route("/buy")
  .get()

module.exports = router