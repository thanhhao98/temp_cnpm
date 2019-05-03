var bCrypt = require('bcrypt-nodejs');
module.exports = {
    isValidPassword: function(userpass,password){
        return bCrypt.compareSync(password, userpass);
    },
    generateHash: function(password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
    },
    numShowPerPage: 2,
    categories: [
        'Development','Design','IT & Software','Personal Development'
    ],
    testDb : {
        "username": "root",
        "password": "Admin!123",
        "database": "test",
        "host": "mysql",
        "port": "3306",
        "dialect": "mysql"
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
    }
};