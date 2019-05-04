var exports = module.exports = {}
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");
const User = require ("../models/user");
const Course = require("../models/course");
const UserAssignCourse = require("../models/userAssignCourse");
const secrectKey = require('../config/config').secrectKey;
const categories = require('../config/config').categories
exports.getUserWaitingInCourse = (req,res,next) =>{
    id = req.userData.userId;
    courseId = req.params.courseId;
    Course.findAll({where: {id: courseId}})
    .then (courses =>{ 
        course = courses[0]
        if (course.adminId == id){
            UserAssignCourse.findAll({where: {courseId: course.id}})
            .then (userAssignCourses => {
                listUserId = []
                for (i=0;i<userAssignCourses.length;i++){
                    listUserId.push(userAssignCourses[i].userId)
                }
                User.findAll({where: {id:listUserId}})
                .then(users=>{
                    listUserAssign = []
                    for (i=0;i<users.length;i++){
                        listUserAssign.push({
                            id: users[i].id,
                            name: users[i].name,
                            username: users[i].username,
                            avt: users[i].avt,
                            email: users[i].email,
                            courseId: courseId
                        })
                    }
                    if (listUserAssign.length >0){
                        return res.status(200).json({
                            isSuccessfully: true,
                            listUserAssign: listUserAssign
                        });
                    }
                    else {
                        return res.status(401).json({
                            isSuccessfully: false,
                            message: "no user waiting assign"
                        });
                    }
                })
            })
        }
        else{
            isSuccessfully = false;
            message: "Admin no ower course"
        }
    })
}
exports.approveSign = (req,res,next) => {
    idSign = req.body.idSign;
    idAdmin = req.userData.userId;
    UserAssingCourse.findAll({where: {id: idSign}})
    .then(signs => {
        sign = signs[0];
        Course.findAll({where: {id: sign.courseId}})
        .then(courses =>{
            course = courses[0]
            if(idAdmin==course.adminId){
                sign.status = 'approve';
                sign.save()
                .then(()=>{
                    return res.status(200).json({
                        isSuccessfully: true,
                        message: 'approve sign successfully'
                    })
                })
                .catch(err=>{
                    console.log(err);
                    res.status(500).json({
                        isSuccessfully: true,
                        error: err
                    });
                })
            }
            res.status(500).json({
                isSuccessfully: true,
                message: 'auth fail'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                isSuccessfully: false,
                error: err
            });
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            isSuccessfully: false,
            error: err
        });
    })
}
exports.getCourseOfAdmin = (req,res,next) =>{
    id = req.userData.userId;
    Course.findAll({where: {adminId: id}})
    .then(courses => {
        courseList = []
        for(i=0;i<courses.length;i++){
            course = courses[i]
            courseList.push({
                category: course.category,
                avatar: course.avt,
                name: course.name,
                date: course.createdAt,
                image: course.image,
                title: course.title,
            })
        }
        if(courseList.length>0){
            return res.status(200).json({
                isSuccessfully: true,
                categories: categories,
                courseList: courseList,
            })
        } else {
            return res.status(401).json({
                isSuccessfully: false,
                message: "Admin owner no course"
            });
        }

    })
    .catch( err => {
        console.log(err);
        res.status(500).json({
            isSuccessfully: false,
            error: err
        });
    }
    )
}
exports.getInfoAdmin = (req,res,next) =>{
    id = parseInt(req.params.userId);
    Admin.findAll({ where: { id: id } })
        .then(admin => {
        if (admin.length != 1) {
            return res.status(401).json({
                isSuccessfully: false,
                message: "request failed"
            });
        }
        admin = admin[0]
        if (admin.id != req.userData.userId){
            return res.status(401).json({
                isSuccessfully: false,
                message: "auth fail"
            });
        }
        data = {
            id : admin.id,
            avt: admin.avt,
            username : admin.username,
            email : admin.email,
            name : admin.name,
            lastlogin : admin.last_login,
        }
        return res.status(200).json({
            isSuccessfully: true,
            data: data,
            message: "successfully"
        });
        })
        .catch(err => {
        console.log(err);
        res.status(500).json({
            isSuccessfully: true,
            error: err
        });
        });
}
exports.checkValidAdmin =  (req, res, next) => {
    Admin.findAll({ where: { email: req.body.email } })
        .then(admin => {
        if (admin.length != 1) {
            return res.status(401).json({
                isSuccessfully: false,
                message: "Auth failed"
            });
        }
        bcrypt.compare(req.body.password, admin[0].password, (err, result) => {
            if (err) {
            return res.status(401).json({
                isSuccessfully: false,
                message: "Auth failed"
            });
            }
            if (result) {
            const token = jwt.sign(
                {
                    email: admin[0].email,
                    isAdmin: true,
                    avt: admin[0].avt,
                    userId: admin[0].id,
                    username: admin[0].username
                },
                secrectKey,
                {
                    expiresIn: "1h"
                }
            );
            return res.status(200).json({
                isSuccessfully: true,
                email: admin[0].email,
                isAdmin: true,
                avt: admin[0].avt,
                userId: admin[0].id,
                username: admin[0].username,
                message: "Auth successful",
                token: token
            });
            }
            res.status(401).json({
            isSuccessfully: false,
            message: "Auth failed"
            });
        });
        })
        .catch(err => {
        console.log(err);
        res.status(500).json({
            isSuccessfully: false,
            error: err
        });
        });
};

exports.createAdmin =  (req, res, next) => {
    Admin.findAll({ where: { email: req.body.email } })
    .then(admin => {
    if (admin.length >= 1) {
        return res.status(409).json({
            isSuccessfully: false,
            message: "Mail exists"
        });
    } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                isSuccessfully: false,
                error: err
            });
        } else {
            const admin = new Admin({
                avt: req.body.avt,
                email: req.body.email,
                name: req.body.name,
                username: req.body.username,
                password: hash
            });
            admin
            .save()
            .then(result => {
                res.status(201).json({
                    isSuccessfully: true,
                    message: "Admin created"
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    isSuccessfully: false,
                    error: err
                });
            });
        }
        });
    }
    });
};
