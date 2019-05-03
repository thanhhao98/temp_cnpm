const router = require('express').Router();
const courseController = require('../controller/course')
router.get('/courseList/:idPage', courseController.getAllCourses)
module.exports = router;