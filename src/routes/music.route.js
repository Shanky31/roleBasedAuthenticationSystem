const express = require('express')
const musicController=require('../controller/music.controller')

const router=express.Router();

router.post('/upload',musicController.createMusic)

module.exports=router;