var exports = module.exports = {}
const Document = require('../models/document')

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