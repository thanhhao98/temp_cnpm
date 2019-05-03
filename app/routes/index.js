const router = require('express').Router();
const passport     = require('passport');
var models = require("../models");
var userController = require("../controller/user/index.js")
require('../config/passport.js')(passport, models.user);


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/signin');
}

router.post('/api/vi/user/register', userController.create);
// router.post('/api/vi/user/register', (req,res)=>{
//     if (userController.createUser(req.body)){
//         return res.status(200).send("ok");
//     } else {
//         return res.status(200).send("fail");
//     }

// });

router.get('/api/vi/user/is_loggin',(req,res)=>{
    res.status(200).send({
        "successfully": true,
        "message": "signup",
        "data": null
    })
})

// router.post('/api/vi/user/login', passport.authenticate('local-signin', {
//     if(userController.)
// }
// ));

router.get('/',(req,res)=>{
    res.status(200).send("successfully");
})


router.get('/thanhhao',(req,res)=>{
    res.status(200).send("fail");
})
module.exports = router;