const express = require('express')
const router = express.Router()
const verifyJWT = require("../auth/auth")

router
    .route("/")
    .get(verifyJWT, (req, res) => {
        res.json({ auth: true, message: "Cart page", id: req.userId })
    })

module.exports = router