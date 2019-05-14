var exports = module.exports = {}
const User = require ("../models/user")
const UserAssignCourse = require("../models/userAssignCourse")
const userController = require('./user')
const courseController = require('./course')

exports.getStatus = async (signId) => {
    signs = await UserAssignCourse.findAll({where: {id:signId}})
    if(signs.length!=1){
        return false
    } else {
        sign = signs[0]
        return sign.status
    }
}

exports.checkUserApproveCourse = async (courseId,userId) => {
    signs = await UserAssignCourse.findAll({where:{courseId:courseId,userId:userId,status:'approve'}})
    if(signs.length == 1){
        return true
    } else {
        return false
    }
}
exports.getListCourseWithUserId = async (userId,status=null) => {
    console.log(status)
    listCourseId = []
    signs = null
    if (status == null){
        signs = await UserAssignCourse.findAll({where: {userId:userId}})
    } else {
        signs = await UserAssignCourse.findAll({where: {userId:userId,status:status}})
    }
    for await (sign of signs){
        listCourseId.push(sign.courseId)
    }
    return listCourseId
}
exports.getCourseId = async (signId) => {
    signs = await UserAssignCourse.findAll({where: {id:signId}})
    if(signs.length!=1){
        return false
    } else {
        sign = signs[0]
        return sign.courseId
    }
}
exports.getAdminId = async (signId) =>{
    courseId = await exports.getCourseId(signId)
    if (courseId){
        return await courseController.getAdminId(courseId)
    } else {
        return false
    }
}

exports.changeStatusSign = async (signId,status) => {
    signs = await UserAssignCourse.findAll({where:{id:signId}});
    if(signs.length != 1){
        return false
    } else {
        sign = signs[0]
        sign.status = status
        await sign.save()
        return true
    }
}
exports.checkSignExist = async (userId,courseId)=>{
    signs = await UserAssignCourse.findAll({ where: { userId: userId, courseId:courseId } })
    if (signs.length > 0) {
        return true
    } else {
        return false
    }
}
exports.createSign = async (userId, courseId) => {
    const sign = new UserAssignCourse({
        userId: userId,
        courseId:courseId
    });
    await sign.save()
}
exports.getUserWaitingInCourse = async (courseId) =>{
    signs = await UserAssignCourse.findAll({where: {courseId: courseId,status:"waiting"}})
    listUserAssign = []
    for await (sign of signs){
        userId = sign.userId
        users = await User.findAll({where: {id:sign.userId}})
        user = users[0]
        signInfo = {}
        signInfo.userInfo = await userController.extractInfo(user)
        signInfo.courseId = courseId
        signInfo.signId = sign.id
        signInfo.status = sign.status
        listUserAssign.push(signInfo)
    }
    return listUserAssign
}