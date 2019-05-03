var exports = module.exports = {};
const Course = require('../models/course');

exports.getAllCourses = (req,res,next) =>{

};

exports.createCourse =  (req, res, next) => {
    Course.findAll({ where: { name: req.body.name } })
    .then(courses=>{
        if(courses.length>=1){
            return res.status(409).json({
                isSuccessfully: false,
                message: "Course name exists"
            });
        }
        adminId = req.userData.userId;
        const course = new Course({
            avt: req.body.avt,
            adminId: adminId,
            name: req.body.name,
            image: req.body.image,
            category: req.body.category
        });
        course
        .save()
        .then(result => {
                res.status(201).json({
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
    }).catch(error=>{
        console.log(err);
        res.status(500).json({
            isSuccessfully: false,
            error: err
        });
    });
};
