const express = require('express')
const router = express.Router()
const params = require('url')
require('dotenv').config()

router
    .route(["/", "/home"])
    .get((req, res) => {
        const q = params.parse(req.url, true)
        // console.log(q)
        res.redirect(process.env.FRONT_END_URL + q.path)
    })

module.exports = router