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
    pathToImage : '/usr/src/project/app/media/image',
    pathToDocument : '/usr/src/project/app/media/document',
    validDocument : ['pdf'],
    validImage : ['png','jpg','PNG','JPG'],
    urlDocument : 'http://localhost:8080/documents/',
    urlImage:   'http://localhost:8080/images/',
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
    herokuDb : {
        'username': 'uptyjqmjjrlklv',
        'password': '0e2f7be9303bcabbce744d35e818ca48938ec2c79ad9e0af19b6871fc96a7514',
        'database': 'd16fh21djnvm3c',
        'host': 'ec2-184-72-237-95.compute-1.amazonaws.com',
        'port': '5432',
        'dialect': 'postgres'
    },
    PORT: process.env.PORT || 8080,
    secrectKey: 'Admin!123977463hao.phanthanh98@gmail.com'
}