const router = require('express').Router();
const bcrypt = require("bcrypt");
const userController = require("../controller/user");
const adminController = require("../controller/admin");
const courseController = require("../controller/course");
const forumController = require("../controller/forum");
const videoController = require("../controller/video");
const checkAuthAdmin = require('../middleware/admin-auth');
router.post("/getAllVideoWithCourseId",checkAuthAdmin,videoController.getAllVideoWithCourseId);
router.post("/createVideo",checkAuthAdmin,videoController.createVideo);
router.get("/listUserWaitingInCourse/:courseId",checkAuthAdmin,adminController.getUserWaitingInCourse);
router.get("/listCourse",checkAuthAdmin,adminController.getCourseOfAdmin);
router.get("/listForum",checkAuthAdmin,adminController.getForumOfAdmin);
router.post("/approveSign",checkAuthAdmin,adminController.approveSign);
router.post("/login", adminController.checkValidAdmin);
router.post("/signup", adminController.createAdmin);
router.post("/createCourse",checkAuthAdmin,courseController.createCourse);
router.post("/createForum",checkAuthAdmin,forumController.createForum);
router.delete("/deleteUserById", checkAuthAdmin, userController.deleteUserById);

router.get('/logout',checkAuthAdmin,(req,res,next)=>{
  delete req.headers.authorization;
  res.status(200).send({
      isSuccessfully: false,
      message: "logout successful",
  });
});

router.post('/private',checkAuthAdmin,(req,res,next)=>{
  res.status(200).send('ok');
});


module.exports = router;