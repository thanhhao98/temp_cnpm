var bCrypt = require('bcrypt-nodejs')
module.exports = {
    successMsg: (data=null) => {
        if(data == null){
            return {
                isSuccessfully: true,
            }
        }
        return {
            isSuccessfully: true,
            data: data,
        }
    },
    failMsg: (msg) => {
        return {
            isSuccessfully: false,
            message: msg
        }
    },
    pathToDocument: '/usr/src/project/app/media/document',
    urlToDocument: 'http://localhost:8080/documents/',
    numShowPerPage: 40,
    categories: [
        'Development', 'Design', 'Bussiness', 'IT & Software', 'Personal Development', 'Marketing', 'Photography', 'Music'
    ],
    testDb : {
        'username': 'root',
        'password': 'Admin!123',
        'database': 'test',
        'host': 'mysql',
        'port': '3306',
        'dialect': 'mysql'
    },
    PORT: process.env.PORT || 8080,
    secrectKey: 'Admin!123977463hao.phanthanh98@gmail.com'
}