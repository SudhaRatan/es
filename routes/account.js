const express = require("express")
const verifyJWT = require("../auth/auth")
const router = express.Router()
const user = require('../models/user')

router
  .route("/")
  .get(verifyJWT, async(req,res) => {
    try {
      const result = await user.findOne({_id:req.userId},{password:0})
      res.json({auth: true, result})
    } catch (error) {
      console.log(error)
    }
  })

module.exports = router