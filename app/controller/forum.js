var exports = module.exports = {}
const Forum = require('../models/forum')

// exports.createForum =  (req, res, next) => {
//     Forum.findAll({ where: { name: req.body.name } })
//     .then(forums=>{
//         if(forums.length>=1){
//             return res.status(200).json({
//                 isSuccessfully: false,
//                 message: 'Forum name exists'
//             });
//         }
//         adminId = req.userData.id;
//         const forum = new Forum({
//             adminId: adminId,
//             name: req.body.name,
//             description: req.body.description,
//         });
//         forum
//         .save()
//         .then(result => {
//                 res.status(200).json({
//                     isSuccessfully: true,
//                     message: 'Forum created'
//             });
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({
//                 isSuccessfully: false,
//                 error: err
//             });
//         });
//     }).catch(error=>{
//         console.log(err);
//         res.status(500).json({
//             isSuccessfully: false,
//             error: err
//         });
//     });

// };

// exports.getAllForums = (req,res,next) =>{
//     idPage = parseInt(req.params.idPage);
//     Forum.findAll({})
//     .then(forums=>{
//         from = idPage*numShowPerPage;
//         to = Math.min((idPage+1)*(numShowPerPage),forums.length);
//         var forumList = []
//         for(i=0;i<forums.length;i++){
//             forum = forums[i]
//             forumList.push({
//                 name: forum.name,
//                 date: forum.createdAt,
//             })
//         }
//         forumList = forumList.slice(from,to);
//         if(forumList.length>0){
//             return res.status(200).json({
//                 sSuccessfully: true,
//                 categories: categories,
//                 forumList: forumList,
//             })
//         } else {
//             return res.status(200).json({
//                 isSuccessfully: false,
//                 message: 'request failed'
//             });
//         }
//     }).catch(error=>{
//         console.log(err);
//         res.status(500).json({
//             isSuccessfully: false,
//             error: err
//         });
//     });
// };