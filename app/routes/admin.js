const router = require('express').Router()
const bcrypt = require('bcrypt')
const adminController = require('../controller/admin')
const courseController = require('../controller/course')
const videoController = require('../controller/video')
const documentController = require('../controller/document')
const checkAuthAdmin = require('../middleware/admin-auth')
const succseeMsg = require('../config/config').successMsg

// Sign
router.put('/approveSign',checkAuthAdmin,adminController.approveSign)
router.get('/listUserWaitingInCourse/:courseId',checkAuthAdmin,adminController.getUserWaitingInCourse)
router.get('/listUserWaiting/',checkAuthAdmin,adminController.getUserWaiting)


// Course
router.post('/createCourse',checkAuthAdmin,courseController.createCourse)
router.get('/listCourse',checkAuthAdmin,adminController.getCourseOfAdmin)
router.get('/getAllVideoWithCourseId/:courseId',checkAuthAdmin,videoController.getAllVideoWithCourseId)

// Document
router.post('/createDocument',checkAuthAdmin,adminController.createDocument)
//router.post('/createDocument',checkAuthAdmin,documentController.uploadDocument.single('document'),adminController.createDocument)

// Forum
// router.post('/createForum',checkAuthAdmin,forumController.createForum)
// router.get('/listForum',checkAuthAdmin,adminController.getForumOfAdmin)


// Video
router.post('/createVideo',checkAuthAdmin,adminController.createVideo)


// Auth
router.post('/login', adminController.checkValidAdmin)
router.post('/signup', adminController.createAdmin)
router.get('/info',checkAuthAdmin,adminController.getInfoAdmin)
router.get('/logout',checkAuthAdmin,(req,res,next)=>{
  delete req.headers.authorization
  res.status(200).send(succseeMsg())
})


// Test
router.post('/private',checkAuthAdmin,(req,res,next)=>{
  res.status(200).send(succseeMsg())
})

module.exports = router