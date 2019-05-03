const router = require('express').Router();
const bcrypt = require("bcrypt");
var User = require("../models/user")
var userController = require("../controller/user")

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
module.exports = router;