const express = require("express")
const router = express.Router()
const verifyJWT = require("../auth/auth")

router
    .route("/products")
    .get(verifyJWT, (req, res) => {
        res.json({auth:true,message:"Your products"})
    })

module.exports = router