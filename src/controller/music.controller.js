const musicModel = require('../models/music.model')
const jwt=require('jsonwebtoken')
const {uploadFile}=require('../services/storage.service')

async function createMusic(req,res) {

    const token = req.cookies.token
    console.log(token)
    if(!token){
        return res.status(401).json({
            message:"User is not Authorized"
        })
    }
    try{
            const decoded=jwt.verify(token,process.env.JWT_SECRET)
            if(decoded?.role!=='artist'){
                 return res.status(403).json({
            message:"User is not Authorized to create music"
        })
            }
            console.log("ye")
            const {title}=req.body;
            const file=req.file;
            console.log(file)
            const result = await uploadFile(file.buffer.toString('base64'));
            console.log(result)
            const music = await musicModel.create({
                title,
                uri:result.url,
                artist:decoded?.id
            })
            return res.status(201).json({
            message:"New Music Added Successfully",
            music:music
        })

    }catch(error){
         return res.status(401).json({
            message:"User is not Authorized ABCD",
            error:error
        })
    }

    
    
}
module.exports={createMusic}