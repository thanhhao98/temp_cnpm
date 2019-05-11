var exports = module.exports = {}
const Video = require('../models/video')
const Course = require('../models/course')

exports.getAllVideoWithCourseId = (req,res,next) => {
    courseId = req.params.courseId
    idAdmin = req.userData.userId
    Course.findAll({where: {id:courseId}})
    .then(courses => {
        if (courses.length != 1){
            return res.status(200).json({
                isSuccessfully: false,
                message: 'course is not exist'
            })
        }
        course = courses[0]
        if (course.adminId != idAdmin){
            return res.status(200).json({
                isSuccessfully: false,
                message: 'auth fail'
            })
        }
        Video.findAll({where:{courseId:course.id}})
        .then(videos=>{
            listVideo = []
            for(i=0;i<videos.length;i++){
                video = videos[i]
                dataVideo =  {
                    courseId: video.courseId,
                    name: video.name,
                    path: video.path,
                    title: video.title,
                    description: video.description,
                }
                listVideo.push(dataVideo)
            }
            return res.status(200).json({
                isSuccessfully: true,
                listVideo: listVideo,
                message: 'succcessfully'
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                isSuccessfully: false,
                error: err
            })
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            isSuccessfully: false,
            error: err
        })
    })
}
exports.createVideo =  (req, res, next) => {
    courseId = req.body.courseId
    idAdmin = req.userData.userId
    Course.findAll({where: {id:courseId}})
    .then(courses => {
        if (courses.length != 1){
            return res.status(200).json({
                isSuccessfully: false,
                message: 'course is not exist'
            })
        }
        course = courses[0]
        if (course.adminId != idAdmin){
            return res.status(200).json({
                isSuccessfully: false,
                message: 'auth fail'
            })
        }
        const video = new Video({
            courseId: courseId,
            name: req.body.name,
            path: req.body.path,
            title: req.body.title,
            description: req.body.description,
        })
        video
        .save()
        .then(result => {
            res.status(200).json({
                isSuccessfully: true,
                message: 'Video created'
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                isSuccessfully: false,
                error: err
            })
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            isSuccessfully: false,
            error: err
        })
    })
}
