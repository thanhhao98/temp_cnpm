const router = require('express').Router()
const userController = require('../controller/user')
const checkAuthUser = require('../middleware/user-auth')
const succseeMsg = require('../config/config').successMsg
const uploadImage = require('../controller/uploadFile').uploadImage


// Video
router.get('/viewCourse/:courseId',checkAuthUser,userController.viewCourse)

// User
router.get('/info',checkAuthUser,userController.getInfoUser)

// Sign
router.get('/getListCourseWaiting',checkAuthUser,userController.getListCourseWaiting)
router.get('/getListCourseApprove',checkAuthUser,userController.getListCourseApprove)
router.post('/signCourse',checkAuthUser, userController.signCourse)

// Auth
router.post('/login', userController.checkValidUser)
router.post('/signup',uploadImage.single('avt'), userController.createUser)
router.get('/logout',checkAuthUser,(req,res,next)=>{
    delete req.headers.authorization
    res.status(200).json(succseeMsg())
})

// Test
router.post('/private',checkAuthUser,(req,res,next)=>{
    res.status(200).json(succseeMsg())
})

module.exports = router