const jwt = require('jsonwebtoken')

const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"]
    if (!token) {
        res.send("no token!!!")
    } else {
        jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
            if (err) {
                res.json({ auth: false, message: "Auth failed", err:err})
                
            } else {
                // console.log(decoded)
                req.userId = decoded.id
                next()
            }
        })
    }
}

module.exports = verifyJWT