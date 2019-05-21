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
    pathToImage : process.cwd()+'/app/media/image',
    pathToDocument : process.cwd()+'/app/media/document',
    validDocument : ['pdf'],
    validImage : ['png','jpg','PNG','JPG'],
    urlDocument : '/documents',
    urlImage:   '/images',
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
        url: 'postgres://uptyjqmjjrlklv:0e2f7be9303bcabbce744d35e818ca48938ec2c79ad9e0af19b6871fc96a7514@ec2-184-72-237-95.compute-1.amazonaws.com:5432/d16fh21djnvm3c',
        config: {
            dialect: 'postgres',
            protocol: 'postgres',
            dialectOptions: {
                ssl: true
            }
        }
    },
    PORT: process.env.PORT || 8080,
    secrectKey: 'Admin!123977463hao.phanthanh98@gmail.com'
}