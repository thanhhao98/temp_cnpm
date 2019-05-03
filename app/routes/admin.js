const router = require('express').Router();
const bcrypt = require("bcrypt");
var User = require("../models/user")
var Admin = require("../models/admin")
var adminController = require("../controller/admin")
const checkAuthAdmin = require('../middleware/admin-auth');
router.post("/login", adminController.checkValidAdmin);
router.post("/signup", adminController.createAdmin);

router.get('/logout',checkAuthAdmin,(req,res,next)=>{
    delete req.headers.authorization;
    res.status(200).send({
        isSuccessfully: false,
        message: "logout successful",
    });
})

router.delete("/deleteUserById", (req, res, next) => {
    User.destroy({ where: {id: req.body.userId }})
      .then(result => {
        res.status(200).json({
            isSuccessfully: true,
            message: "User deleted"
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
            isSuccessfully: false,
            error: err
        });
      });
});

router.post('/private',checkAuthAdmin,(req,res,next)=>{
  res.status(200).send('ok');
})
module.exports = router;