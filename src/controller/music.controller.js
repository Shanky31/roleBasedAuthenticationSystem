const musicModel = require('../models/music.model')
const albumModel=require('../models/album.model')
const jwt=require('jsonwebtoken')
const {uploadFile}=require('../services/storage.service')

async function createMusic(req,res) {
            const {title}=req.body;
            const file=req.file;
            console.log(req.body)
            const result = await uploadFile(file.buffer.toString('base64'));
            const music = await musicModel.create({
                title,
                uri:result.url,
                artist:req.user?.id
            })
            return res.status(201).json({
            message:"New Music Added Successfully",
            music:music
        })  
}
async function createAlbum(req,res){
    const {title,musics}=req.body;
    const album = await albumModel.create({
        title,
        musics:musics,
        artist:req.user.id
    })
       return res.status(201).json({
            message:"New Music Added Successfully",
            album:album
        })

}
async function getAllMusic(req,res){
//    const musics=await musicModel.find();->gived id
 const musics=await musicModel.find().populate("artist","userName email");
   res.status(200).json({
    message:"Music fetched successfully",
    list:musics
   })

}
module.exports={createMusic,createAlbum,getAllMusic}