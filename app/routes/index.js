const router = require('express').Router();
const Course = require('../models/course')
router.post('/',(req,res,next)=>{
    res.status(200).send('ok');
})
module.exports = router;