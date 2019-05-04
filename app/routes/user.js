const router = require('express').Router();
var userController = require("../controller/user");
const checkAuthUser = require('../middleware/user-auth');

router.get("/info/:userId",checkAuthUser,userController.getInfoUser);
router.post("/signCourse",checkAuthUser, userController.userSignCourse);
router.post("/login", userController.checkValidUser);
router.post("/signup", userController.createUser);
router.get('/logout',checkAuthUser,(req,res,next)=>{
    delete req.headers.authorization;
    res.status(200).send({
        isSuccessfully: false,
        message: "logout successful",
    });
})

router.post('/private',checkAuthUser,(req,res,next)=>{
    res.status(200).send('ok');
})

module.exports = router;