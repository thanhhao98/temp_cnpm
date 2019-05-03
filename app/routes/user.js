const router = require('express').Router();
var userController = require("../controller/user");
const checkAuth = require('../middleware/user-auth');

router.get("/info/:userId",checkAuth,userController.getInfoUser);
router.post("/login", userController.checkValidUser);
router.post("/signup", userController.createUser);
router.get('/logout',checkAuth,(req,res,next)=>{
    delete req.headers.authorization;
    res.status(200).send({
        isSuccessfully: false,
        message: "logout successful",
    });
})

router.post('/private',checkAuth,(req,res,next)=>{
    res.status(200).send('ok');
})

module.exports = router;