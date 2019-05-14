var exports = module.exports = {}
const Video = require('../models/video')
const Course = require('../models/course')

exports.getAllVideoWithCourseId = async (courseId) => {
    videos = await Video.findAll({where: {courseId:courseId}})
    listVideo = []
    for await (video of videos){
        dataVideo =  await exports.extractInfo(video)
        listVideo.push(dataVideo)
    }
    return listVideo
}

exports.extractInfo = async (video) =>{
    return {
        courseId: video.courseId,
        name: video.name,
        path: video.path,
        title: video.title,
        description: video.description,
    }
}
exports.createVideo =  async (courseId,name, path, title, description) => {
    const video = new Video({
        courseId: courseId,
        name: name,
        path: path,
        title: title,
        description: description
    })
    await video.save()
}
