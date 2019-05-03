var exports = module.exports = {}
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var Admin = require("../models/admin");
const secrectKey = require('../config/config').secrectKey;

exports.getInfoAdmin = (req,res,next) =>{
    id = parseInt(req.params.userId);
    Admin.findAll({ where: { id: id } })
        .then(admin => {
        if (admin.length != 1) {
            return res.status(401).json({
                isSuccessfully: false,
                message: "request failed"
            });
        }
        admin = admin[0]
        if (admin.id != req.userData.userId){
            return res.status(401).json({
                isSuccessfully: false,
                message: "auth fail"
            });
        }
        data = {
            id : admin.id,
            avt: admin.avt,
            username : admin.username,
            email : admin.email,
            name : admin.name,
            lastlogin : admin.last_login,
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
exports.checkValidAdmin =  (req, res, next) => {
    Admin.findAll({ where: { email: req.body.email } })
        .then(admin => {
        if (admin.length != 1) {
            return res.status(401).json({
                isSuccessfully: false,
                message: "Auth failed"
            });
        }
        bcrypt.compare(req.body.password, admin[0].password, (err, result) => {
            if (err) {
            return res.status(401).json({
                isSuccessfully: false,
                message: "Auth failed"
            });
            }
            if (result) {
            const token = jwt.sign(
                {
                    email: admin[0].email,
                    isAdmin: true,
                    avt: admin[0].avt,
                    userId: admin[0].id,
                    username: admin[0].username
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

exports.createAdmin =  (req, res, next) => {
    Admin.findAll({ where: { email: req.body.email } })
    .then(admin => {
    if (admin.length >= 1) {
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
            const admin = new Admin({
                avt: req.body.avt,
                email: req.body.email,
                name: req.body.name,
                username: req.body.username,
                password: hash
            });
            admin
            .save()
            .then(result => {
                res.status(201).json({
                    isSuccessfully: true,
                    message: "Admin created"
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
