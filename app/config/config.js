var bCrypt = require('bcrypt-nodejs');
module.exports = {
    isValidPassword: function(userpass,password){
        return bCrypt.compareSync(password, userpass);
    },
    generateHash: function(password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
    },
    PORT: process.env.PORT || 8080,
    secrectKey: "Admin!123977463hao.phanthanh98@gmail.com",
    listTable : {
        Account : [
            "id",
            "Name",
            "Password",
            "Phone",
            "Email",
            "Avatar",
            "CreateAt",
            "UpdateAt"
        ],
        Admin : [
            'id',
            'AccId',
        ],
        User : [
            'id',
            'AccId'
        ]
    },
    session : {
        key: 'user_sid',
        secret: 'goN6DJJC6E287cC77kkdYuNuAyWnz7Q3iZj8',
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 600000
        }
    }
};