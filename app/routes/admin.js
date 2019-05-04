const router = require('express').Router();
const bcrypt = require("bcrypt");
var userController = require("../controller/user")
var adminController = require("../controller/admin")
var courseController = require("../controller/course")
const checkAuthAdmin = require('../middleware/admin-auth');

router.get("/listCourse",checkAuthAdmin,adminController.getCourseOfAdmin);
router.post("/login", adminController.checkValidAdmin);
router.post("/signup", adminController.createAdmin);
router.post("/createCourse",checkAuthAdmin,courseController.createCourse);
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