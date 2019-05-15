var exports = module.exports = {}
const multer = require('multer')
const pathToDocument = require('../config/config').pathToDocument
const validDocument = require('../config/config').validDocument
const pathToImage = require('../config/config').pathToImage
const validImage = require('../config/config').validImage

const storageDocument = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null,pathToDocument)
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
})

const fileFilterDocument = (req, file, cb) => {
    tokens = file.originalname.split('.')
    if(tokens.length == 2){
        extension = tokens[tokens.length-1]
        if (validDocument.includes(extension)) {
            return cb(null, true)
        }
    }
    return cb(null,false)
}

exports.uploadDocument = multer({
    storage: storageDocument,
    limits: {
        fileSize: 1024 * 1024 * 100
    },
    fileFilter: fileFilterDocument
})

const storageImage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null,pathToImage)
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
})

const fileFilterImage = (req, file, cb) => {
    tokens = file.originalname.split('.')
    if(tokens.length == 2){
        extension = tokens[tokens.length-1]
        if (validImage.includes(extension)) {
            return cb(null, true)
        }
    }
    return cb(null,false)
}

exports.uploadImage = multer({
    storage: storageImage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilterImage
})