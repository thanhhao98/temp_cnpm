const router = require('express').Router();
const courseController = require('../controller/course')
router.get('/courseList', courseController.getAllCourses);
router.get('/courseListPaginate/:idPage', courseController.getAllCoursesWithPaginate);
module.exports = router;