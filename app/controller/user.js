var exports = module.exports = {}
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var User = require("../models/user");
const secrectKey = require('../config/config').secrectKey;

exports.getInfoUser = (req,res,next) =>{
    id = parseInt(req.params.userId);
    User.findAll({ where: { id: id } })
        .then(user => {
        if (user.length != 1) {
            return res.status(401).json({
                isSuccessfully: false,
                message: "request failed"
            });
        }
        user = user[0]
        if (user.id != req.userData.userId){
            return res.status(401).json({
                isSuccessfully: false,
                message: "auth fail"
            });
        }
        data = {
            id : user.id,
            username : user.username,
            email : user.email,
            name : user.name,
            lastlogin : user.last_login,
            status : user.status,
            isAdmin: user.isAdmin
        }
        return res.status(200).json({
            isSuccessfully: true,
            data: data,
            message: "successfully"
        });
        })
        .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
        });
}
exports.checkValidUser =  (req, res, next) => {
    User.findAll({ where: { email: req.body.email } })
        .then(user => {
        if (user.length < 1) {
            return res.status(401).json({
                isSuccessfully: false,
                message: "Auth failed"
            });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if (err) {
            return res.status(401).json({
                isSuccessfully: false,
                message: "Auth failed"
            });
            }
            if (result) {
            const token = jwt.sign(
                {
                    email: user[0].email,
                    userId: user[0].id,
                    username: user[0].username
                },
                secrectKey,
                {
                    expiresIn: "1h"
                }
            );
            return res.status(200).json({
                isSuccessfully: true,
                message: "Auth successful",
                token: token
            });
            }
            res.status(401).json({
            isSuccessfully: false,
            message: "Auth failed"
            });
        });
        })
        .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
        });
};

exports.createUser =  (req, res, next) => {
    User.findAll({ where: { email: req.body.email } })
    .then(user => {
    if (user.length >= 1) {
        return res.status(409).json({
            isSuccessfully: false,
            message: "Mail exists"
        });
    } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                isSuccessfully: false,
                error: err
            });
        } else {
            const user = new User({
            email: req.body.email,
            name: req.body.name,
            username: req.body.username,
            password: hash
            });
            user
            .save()
            .then(result => {
                console.log(result);
                res.status(201).json({
                    isSuccessfully: true,
                    message: "User created"
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    isSuccessfully: false,
                    error: err
                });
            });
        }
        });
    }
    });
};
