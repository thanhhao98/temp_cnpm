var exports = module.exports = {}
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Admin = require('../models/admin')
const Course = require('../models/course')
// const Forum = require ('../models/forum')
const secrectKey = require('../config/config').secrectKey
const succseeMsg = require('../config/config').successMsg
const failMsg = require('../config/config').failMsg
const signController = require('./sign')
const courseController = require('./course')
const videoController = require('./video')
const documentController = require('./document')
const urlDocument = require('../config/config').urlDocument
const urlImage = require('../config/config').urlImage

exports.extractInfo = async (admin)=>{
    return {
        id : admin.id,
        avt: admin.avt,
        username : admin.username,
        email : admin.email,
        name : admin.name,
    }
}

// not ok
// exports.getForumOfAdmin = (req,res,next) =>{
//     id = req.userData.id
//     Forum.findAll({where: {adminId: id}})
//     .then(forums => {
//         forumList = []
//         for(i=0;i<forums.length;i++){
//             forum = forums[i]
//             forumList.push({
//                 id: forum.id,
//                 adminId: id,
//                 name: forum.name,
//                 description: forum.description,
//                 date: forum.createdAt,
//             })
//         }
//         return res.status(200).json(succseeMsg(forumList))

//     })
//     .catch( error => {
//         console.log(error)
//         res.status(500).json(failMsg(error))
//     })
// }
exports.getUserWaiting = async (req,res,next) => {
    adminId = req.userData.id
    listUserAssign = []
    courses = await Course.findAll({where: {adminId: adminId}})
    for await (course of courses){
        courseId = course.id
        listUserAssign = listUserAssign.concat(await signController.getUserWaitingInCourse(courseId))
    }
    data = {
        listUserAssign: listUserAssign
    }
    return res.status(200).json(succseeMsg(data))
}

exports.getUserWaitingInCourse = async (req,res,next) =>{
    adminId = req.userData.id
    courseId = req.params.courseId
    listUserAssign = []
    courses = await Course.findAll({where: {id:courseId,adminId: adminId}})
    courseId = courses[0].id
    listUserAssign = await signController.getUserWaitingInCourse(courseId)
    data = {
        listUserAssign: listUserAssign
    }
    return res.status(200).json(succseeMsg(data))
}

exports.approveSign = async (req,res,next) => {
    signId = req.body.signId
    idAdmin = req.userData.id
    if(idAdmin = await signController.getAdminId(signId)){
        if(await signController.getStatus(signId)=='waiting'){
            if(await signController.changeStatusSign(signId,'approve')){
                return res.status(200).json(succseeMsg())
            } else {
                return res.status(200).json(failMsg('approve fail'))
            }
        } else {
            return res.status(200).json(failMsg('Sign already approve'))
        }
    } else {
        return res.status(200).json(failMsg('Course is not owner by admin'))
    }
}

exports.getCourseOfAdmin = async (req,res,next) =>{
    adminId = req.userData.id
    courseList = await courseController.getCourseWithAdminId(adminId)
    data = {
        courseList: courseList
    }
    return res.status(200).json(succseeMsg(data))
}
exports.getInfoAdmin = async (req,res,next) =>{
    adminId = req.userData.id
    admins = await Admin.findAll({ where: { id: adminId } })
    if(admins.length!=1){
        return res.status(200).json(failMsg('admin is not exist'))
    }
    admin = admins[0]
    data = {
        adminInfo: await exports.extractInfo(admin)
    }
    return res.status(200).json(succseeMsg(data))
}
exports.checkValidAdmin = async (req, res, next) => {
    admins = await Admin.findAll({ where: { email: req.body.email } })
    if(admins.length!=1){
        return res.status(200).json(failMsg('email is not exist'))
    }
    admin = admins[0]
    passwordVaild = await bcrypt.compare(req.body.password,admin.password)
    if (!passwordVaild) {
        return res.status(200).json(failMsg('Password is not valid'))
    }
    userInfo = await exports.extractInfo(admin)
    userInfo.isAdmin = true
    const token = jwt.sign(userInfo,secrectKey,{expiresIn: '1h'})
    userInfo.token = token
    data = {
        userInfo: userInfo
    }
    return res.status(200).json(succseeMsg(data))
}

exports.createAdmin = async  (req, res, next) => {
    avt = ''
    if(req.file != undefined){
        avt =  urlImage + '/' + req.file.filename
    }
    admins = await Admin.findAll({ where: { email: req.body.email } })
    if (admins.length >= 1) {
        return res.status(200).json(failMsg('Mail exists'))
    }
    hash = await bcrypt.hash(req.body.password,10)
    console.log({
        avt: avt,
        email: req.body.email,
        name: req.body.name,
        username: req.body.username,
        password: hash
    })
    const admin = new Admin({
        avt: avt,
        email: req.body.email,
        name: req.body.name,
        username: req.body.username,
        password: hash
    })
    result = await admin.save()
    res.status(200).json(succseeMsg())
}

exports.createDocument = async (req,res,next) => {
    courseId = req.body.courseId
    if ( await courseController.getAdminId(courseId) != req.userData.id){
        return res.status(200).json(failMsg('Admin do not own this course'))
    }
    name =  req.body.name
    if(req.file == undefined){
        return res.status(200).json(failMsg('Only pdf is valid'))
    }
    path =  urlDocument+'/'+req.file.filename
    title =  req.body.title
    description =  req.body.description
    if (await documentController.checkExitTitle(title,courseId)){
        return res.status(200).json(failMsg('This title of document is exist in course'))
    }
    await documentController.createDocument(courseId,name,path,title,description)
    return res.status(200).json(succseeMsg())
}
exports.createVideo = async (req,res,next) => {
    courseId = req.body.courseId
    if ( await courseController.getAdminId(courseId) != req.userData.id){
        return res.status(200).json(failMsg('Admin do not own this course'))
    }
    name =  req.body.name
    path =  req.body.path
    title =  req.body.title
    description =  req.body.description
    if (await videoController.checkExitTitle(title,courseId)){
        return res.status(200).json(failMsg('This title of video is exist in course'))
    }
    await videoController.createVideo(courseId,name,path,title,description)
    return res.status(200).json(succseeMsg())
}