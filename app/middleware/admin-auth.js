const jwt = require('jsonwebtoken')
const failMsg = require('../config/config').failMsg
secrectKey = require('../config/config').secrectKey

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, secrectKey)
        if (decoded.isAdmin){
            req.userData = decoded
            next()
        } else {
            return res.status(401).json(failMsg('Auth failed'))
        }
    } catch (error) {
        return res.status(401).json(failMsg('Auth failed'))
    }
}