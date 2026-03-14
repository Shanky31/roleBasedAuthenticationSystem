const express = require('express')
const musicController=require('../controller/music.controller')
const authMiddleware=require('../middleware/auth.middleware')
const multer = require('multer');

const router=express.Router();

const upload = multer({
    storage:multer.memoryStorage()
})

router.post('/upload',authMiddleware.authArtist,upload.single('music'), musicController.createMusic)
router.post('/create-album',authMiddleware.authArtist, musicController.createAlbum)
router.get('/', musicController.getAllMusic)

module.exports=router;