const express = require("express")
const router = express.Router()
const verifyJWT = require("../auth/auth")

router
    .route("/upload")
    .get(verifyJWT, (req, res) => {
        res.json({ auth: true, message: "Upload a Product" })
    })
    .post(verifyJWT, async (req, res) => {
        console.log(req.body.post)
        res.send("posted")
    })

module.exports = router