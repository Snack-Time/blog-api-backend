const jwt = require('jsonwebtoken')
require('dotenv')

const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers["authorization"]
    if(typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1];
        req.token = bearerToken
    }
    else {
        req.token = undefined; 
    }
    jwt.verify(req.token, process.env.USER_TOKEN,(err, authData) => {
        if(err) {
            res.sendStatus(403)
        }
        else {
            req.authData = authData
            req.userStatus = authData.user.status
            next()
        }
    })
}

module.exports = verifyToken;