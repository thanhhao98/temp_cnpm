var exports = module.exports = {};
const Course = require('../models/course');
const numShowPerPage = require('../config/config').numShowPerPage;
const categories = require('../config/config').categories

exports.getAllCoursesWithPaginate = (req,res,next) =>{
    idPage = parseInt(req.params.idPage);
    Course.findAll({})
    .then(courses=>{
        from = idPage*numShowPerPage;
        to = Math.min((idPage+1)*(numShowPerPage),courses.length);
        var courseList = []
        for(i=0;i<courses.length;i++){
            course = courses[i]
            courseList.push({
                id: course.id,
                category: course.category,
                avatar: course.avt,
                name: course.name,
                date: course.createdAt,
                image: course.image,
                title: course.title,
            })
        }
        courseList = courseList.slice(from,to);
        if(courseList.length>0){
            return res.status(200).json({
                sSuccessfully: true,
                categories: categories,
                courseList: courseList,
            })
        } else {
            return res.status(200).json({
                isSuccessfully: false,
                message: "request failed"
            });
        }
    }).catch(error=>{
        console.log(err);
        res.status(500).json({
            isSuccessfully: false,
            error: err
        });
    });
};
exports.getAllCourses = (req,res,next) =>{
    Course.findAll({})
    .then(courses=>{
        var courseList = []
        for(i=0;i<courses.length;i++){
            course = courses[i]
            courseList.push({
                id: course.id,
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
                sSuccessfully: true,
                categories: categories,
                courseList: courseList,
            })
        } else {
            return res.status(200).json({
                isSuccessfully: false,
                message: "request failed"
            });
        }
    }).catch(error=>{
        console.log(err);
        res.status(500).json({
            isSuccessfully: false,
            error: err
        });
    });
};

exports.createCourse =  (req, res, next) => {
    Course.findAll({ where: { title: req.body.title } })
    .then(courses=>{
        if(courses.length>=1){
            return res.status(200).json({
                isSuccessfully: false,
                message: "Course title exists"
            });
        }
        adminId = req.userData.userId;
        adminName = req.userData.username;
        const course = new Course({
            avt: adminName.charAt(0),
            adminId: adminId,
            name: adminName,
            image: req.body.image,
            title: req.body.title,
            description: req.body.description,
            category: req.body.category
        });
        course
        .save()
        .then(result => {
                res.status(200).json({
                    isSuccessfully: true,
                    message: "Course created"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                isSuccessfully: false,
                error: err
            });
        });
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            isSuccessfully: false,
            error: err
        });
    });
};
