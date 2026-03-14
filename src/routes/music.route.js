const express = require('express')
const musicController=require('../controller/music.controller')
const authMiddleware=require('../middleware/auth.middleware')
const multer = require('multer');

const router=express.Router();

const upload = multer({
    storage:multer.memoryStorage()
})
// create music-artists authenticated
router.post('/upload',authMiddleware.authArtist,upload.single('music'), musicController.createMusic)
// create albums-artists authenticated
router.post('/create-album',authMiddleware.authArtist, musicController.createAlbum)
// caan be accessed by any
router.get('/', musicController.getAllMusic)
// to get all the albums accessed by any one 
router.get('/album',authMiddleware.authArtist, musicController.getAllAlbum)
// to get all the music from a single album  by id 
router.get('/albums/:albumId',musicController.getAlbumById)

module.exports=router;