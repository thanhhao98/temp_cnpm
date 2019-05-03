var exports = module.exports = {}
var User = require("../../models").user
var generateHash = require("../../config/config").generateHash;
const validator     = require('validator');

const getUniqueKeyFromBody = function(body){// this is so they can send in 3 options unique_key, email, or phone and it will work
    let unique_key = body.unique_key;
    if(typeof unique_key==='undefined'){
        if(typeof body.email != 'undefined'){
            unique_key = body.email
        }else if(typeof body.username != 'undefined'){
            unique_key = body.username
        }else{
            unique_key = null;
        }
    }

    return unique_key;
}
const createUser = async (userInfo) => {
    let unique_key, auth_info, err;

    auth_info={};
    auth_info.status='create';
    userInfo.password =  generateHash(userInfo.password)
    unique_key = getUniqueKeyFromBody(userInfo);
    if(!unique_key) TE('An email or phone number was not entered.');

    if(validator.isEmail(unique_key)){
        auth_info.method = 'email';
        userInfo.email = unique_key;

        [err, user] = await to(User.create(userInfo));
        if(err) TE('user already exists with that email');

        return user;

    }else {//checks if only phone number was sent
        auth_info.method = 'username';
        userInfo.username = unique_key;

        [err, user] = await to(User.create(userInfo));
        if(err) TE('user already exists with that phone number');

        return user;
    }
};

exports.create = async function(req, res){
    const body = req.body;

    if(!body.unique_key && !body.email && !body.username){
        return ReE(res, 'Please enter an email or phone number to register.');
    } else if(!body.password){
        return ReE(res, 'Please enter a password to register.');
    }else{
        let err, user;

        [err, user] = await to(createUser(body));

        if(err) return ReE(res, err, 422);
        return ReS(res, {message:'Successfully created new user.', user:user.toWeb(), token:user.getJWT()}, 201);
    }
}
// exports.getAllUsers = async () => {
//     return await User.findAll();
// };

// exports.getUser = async obj => {
//     return await User.findOne({
//         where: obj,
//     });
// };

// exports.createUser = function(body) {
//     User.findOne({where: {email:body.email}}).then(function(user){
//         if(user)
//         {
//             return false
//         }
//         else
//         {
//             var userPassword = generateHash(body.password);
//             result = false
//             var data =
//             { email:body.email,
//             password: userPassword,
//             name: body.name,
//             username: body.usename,
//             };
//             User.create(data).then(function(newUser,created){
//             if(!newUser){
//                 return null;
//             }
//             if(newUser){
//                 return newUser;
//             }
//             });

//         }
//     });
//     return true
// }

// exports.checkValidUser = function(body){
//     User.findOne({ where : { email: email}}).then(function (user) {
//         if (!user) {
//           return done(null, false, { message: 'Email does not exist' });
//         }
//         if (!isValidPassword(user.password,password)) {
//           return done(null, false, { message: 'Incorrect password.' });
//         }
//         var userinfo = user.get();
//         return done(null,userinfo);
//     }).catch(function(err){
//         console.log("Error:",err);
//         return done(null, false, { message: 'Something went wrong with your Signin' });
//     });
// }