var exports = module.exports = {}
const Document = require('../models/document')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        console.log('ok')
        cb(null, '../media/document')
        console.log('ok1')
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
})

const fileFilter = (req, file, cb) => {
    if (true) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

exports.uploadDocument = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})

exports.extractInfo = async (document) =>{
    return {
        id: document.id,
        courseId: document.courseId,
        name: document.name,
        path: document.path,
        title: document.title,
        description: document.description,
    }
}

exports.getAllDocumentWithCourseId = async (courseId) => {
    documents = await Document.findAll({where: {courseId:courseId}})
    listDocument = []
    for await (document of documents){
        dataDocument =  await exports.extractInfo(document)
        listDocument.push(dataDocument)
    }
    return listDocument
}

exports.checkExitTitle = async (title,courseId) => {
    documents = await Document.findAll({where: {courseId:courseId,title:title}})
    if(documents.length > 0){
        return true
    } else {
        return false
    }
}
exports.createDocument =  async (courseId,name, path, title, description) => {
    const docuement = new Document({
        courseId: courseId,
        name: name,
        path: path,
        title: title,
        description: description
    })
    await docuement.save()
}