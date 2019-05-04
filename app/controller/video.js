var exports = module.exports = {};
const Video = require("../models/video");


exports.createVideo =  (req, res, next) => {
    courseId = req.body.courseId;
    const video = new Video({
        courseId: courseId,
        name: req.body.name,
        path: req.body.path,
        title: req.body.title,
        description: req.body.description,
    });
    video
    .save()
    .then(result => {
            res.status(201).json({
                isSuccessfully: true,
                message: "Video created"
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            isSuccessfully: false,
            error: err
        });
    });
};
