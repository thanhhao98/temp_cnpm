const jwt = require('jsonwebtoken')
secrectKey = require('../config/config').secrectKey
const failMsg = require('../config/config').failMsg

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, secrectKey)
        if (decoded.isAdmin){
            return res.status(401).json(failMsg('Auth failed'))
        } else {
            req.userData = decoded
            next()
        }
    } catch (error) {
        return res.status(401).json(failMsg('Auth failed'))
    }
}