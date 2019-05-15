var exports = module.exports = {}
const Course = require('../models/course')
const numShowPerPage = require('../config/config').numShowPerPage
const categories = require('../config/config').categories
const succseeMsg = require('../config/config').successMsg
const failMsg = require('../config/config').failMsg
const urlImage = require('../config/config').urlImage

exports.extractInfo = async (course) =>{
    return {
        id: course.id,
        category: course.category,
        avatar: course.avt,
        name: course.name,
        date: course.createdAt,
        image: course.image,
        title: course.title,
    }
}

exports.getAdminId = async (courseId) =>{
    courses = await Course.findAll({where:{id:courseId}})
    if(courses.length!=1){
        return false
    } else {
        course = courses[0]
        return course.adminId
    }
}

exports.getCourseWithId = async (courseId) => {
    courses = await Course.findAll({where: {id: courseId}})
    courseList = []
    for await (course of courses){
        courseList.push(await exports.extractInfo(course))
    }
    return courseList
}

exports.getCourseWithAdminId = async (adminId) => {
    courses = await Course.findAll({where: {adminId: adminId}})
    courseList = []
    for await (course of courses){
        courseList.push(await exports.extractInfo(course))
    }
    return courseList
}
exports.getAllCoursesWithPaginate = async (req,res,next) =>{
    idPage = parseInt(req.params.idPage)
    courses = await Course.findAll({})
    from = idPage*numShowPerPage
    numPage = Math.round(courses.length/numShowPerPage) + 1
    to = Math.min((idPage+1)*(numShowPerPage),courses.length)
    courseList = []
    for await (course of courses){
        courseList.push(await exports.extractInfo(course))
    }
    courseList = courseList.slice(from,to)
    data = {
        numPage: numPage,
        ategories: categories,
        courseList: courseList,
    }
    return res.status(200).json(succseeMsg(data))
}
exports.getAllCourses = async (req,res,next) =>{
    courses = await Course.findAll({})
    courseList = []
    for await (course of courses){
        courseList.push(await exports.extractInfo(course))
    }
    data = {
        ategories: categories,
        courseList: courseList,
    }
    return res.status(200).json(succseeMsg(data))
}

exports.createCourse = async (req, res, next) => {
    if(req.file == undefined){
        return res.status(200).json(failMsg('Image of course is require'))
    }
    image =  urlImage + req.file.filename
    courses = await Course.findAll({ where: { title: req.body.title } })
    if(courses.length>=1){
        return res.status(200).json(failMsg('Course title exists'))
    }
    adminName = req.userData.username
    const course = new Course({
        avt: adminName.charAt(0),
        adminId: req.userData.id,
        name: adminName,
        image: image,
        title: req.body.title,
        description: req.body.description,
        category: req.body.category
    })
    await course.save()
    res.status(200).json(succseeMsg())
}
