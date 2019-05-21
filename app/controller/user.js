var exports = module.exports = {}
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const secrectKey = require('../config/config').secrectKey
const succseeMsg = require('../config/config').successMsg
const failMsg = require('../config/config').failMsg
const signController = require('./sign')
const videoController = require('./video')
const courseController = require('./course')
const documentController = require('./document')
const urlImage = require('../config/config').urlImage

exports.extractInfo =  (user) => {
    return {
        id : user.id,
        avt: user.avt,
        username : user.username,
        email : user.email,
        name : user.name,
        lastLogin : user.last_login,
        status : user.status,
    }
}
exports.signCourse = async (req,res,next)=>{
    userId = req.userData.id
    courseId = req.body.courseId
    if(await signController.checkSignExist(userId,courseId)){
        return res.status(200).json(failMsg('User already sign this course'))
    }
    await signController.createSign(userId,courseId)
    return res.status(200).json(succseeMsg())
}
exports.getInfoUser = async (req,res,next) => {
    userId = req.userData.id
    users = await User.findAll({ where: { id: userId } })
    if(users.length!=1){
        return res.status(200).json(failMsg('user is not exist'))
    }
    user = users[0]
    data = {
        userInfo: await exports.extractInfo(user)
    }
    return res.status(200).json(succseeMsg(data))
}

exports.getListCourseWithStatus = async (userId,status) => {
    listCourse = await signController.getListCourseWithUserId(userId,status)
    return await courseController.getCourseWithId(listCourse)
}

exports.getListCourseWaiting = async (req,res,next) => {
    userId = req.userData.id
    data = {
        listCourse : await exports.getListCourseWithStatus(userId,'waiting')
    }
    return res.status(200).json(succseeMsg(data))
}

exports.getListCourseApprove = async (req,res,next) => {
    userId = req.userData.id
    data = {
        listCourse : await exports.getListCourseWithStatus(userId,'approve')
    }
    return res.status(200).json(succseeMsg(data))
}

exports.checkValidUser = async (req, res, next) => {
    users = await User.findAll({ where: { email: req.body.email } })
    if(users.length!=1){
        return res.status(200).json(failMsg('email is not exist'))
    }
    user = users[0]
    passwordVaild = await bcrypt.compare(req.body.password,user.password)
    if (!passwordVaild) {
        return res.status(200).json(failMsg('Password is not valid'))
    }
    userInfo = exports.extractInfo(user)
    const token = jwt.sign(userInfo,secrectKey,{expiresIn: '1h'})
    userInfo.token = token
    data = {
        userInfo: userInfo
    }
    user.last_login = new Date().toISOString()
    await user.save()
    return res.status(200).json(succseeMsg(data))
}

exports.viewCourse = async (req,res,next) => {
    courseId = req.params.courseId
    userId = req.userData.id
    if (await signController.checkUserApproveCourse(courseId,userId)){
        courseInfo = await courseController.getCourseWithId(courseId)
        courseInfo = courseInfo[0]
        data = {
            courseInfo : courseInfo,
            listDocument : await documentController.getAllDocumentWithCourseId(courseId),
            listVideo: await videoController.getAllVideoWithCourseId(courseId)
        }
        return res.status(200).json(succseeMsg(data))
    } else {
        return res.status(200).json(failMsg('user is not able to view this course'))
    }
}

exports.createUser = async  (req, res, next) => {
    avt = ''
    if(req.file != undefined){
        avt =  urlImage + '/' + req.file.filename
    }
    users = await User.findAll({ where: { email: req.body.email } })
    if (users.length >= 1) {
        return res.status(200).json(failMsg('Mail exists'))
    }
    hash = await bcrypt.hash(req.body.password,10)
    const user = new User({
        avt: avt,
        email: req.body.email,
        name: req.body.name,
        username: req.body.username,
        password: hash
    })
    result = await user.save()
    res.status(200).json(succseeMsg())
}
