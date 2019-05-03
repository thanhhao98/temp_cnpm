const router = require('express').Router();

router.post('/private',(req,res,next)=>{
    res.status(200).send('ok');
})
module.exports = router;