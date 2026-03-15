const express = require('express')
const musicController=require('../controller/music.controller')
const authMiddleware=require('../middleware/auth.middleware')
const multer = require('multer');

const router=express.Router();

const upload = multer({
    storage:multer.memoryStorage()
})
// create music-artists authenticated
router.post('/upload', authMiddleware.authArtist, upload.fields([
    { name: 'music', maxCount: 1 },
    { name: 'thumbnailImage', maxCount: 1 }
]), musicController.createMusic)
// create albums-artists authenticated
router.post('/create-album',authMiddleware.authArtist, musicController.createAlbum)
// caan be accessed by any
router.get('/', musicController.getAllMusic)
// to get all the albums accessed by any one 
router.get('/album',authMiddleware.authArtist, musicController.getAllAlbum)
// to get all the music from a single album  by id 
router.get('/albums/:albumId',musicController.getAlbumById)
// to like a music by user 
router.post('/like/:musicId',authMiddleware.authUser, musicController.likeMusic)
// to unlike a music by user 
router.post('/unlike/:musicId',authMiddleware.authUser, musicController.unlikeMusic)
// to get all the music liked by a single user  by id 
router.get('/liked-music/:userId',authMiddleware.authUser, musicController.getLikedMusic)

module.exports=router;