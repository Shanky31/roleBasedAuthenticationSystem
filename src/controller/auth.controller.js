const userModel = require('../models/user.model')
const jwt=require('jsonwebtoken');
const bcrypt = require('bcrypt');

async function registerUser(req,res) {
    const {userName,email,password,role='user'}=req.body
    try{
        const isExistingUser=await userModel.findOne({
            $or:[
                {userName},
                {email}
            ]
        })
        if(isExistingUser){
            return res.status(409).json({
                message:"User Already Exists"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const createdUser = await userModel.create({
                userName,email,password: hashedPassword,role    
            })

        const token = jwt.sign({
            id:createdUser.id,
            role:createdUser.role
        },process.env.JWT_SECRET);
        res.cookie('token',token)
        res.status(200).json({
            message:"User Created Successfully"
            
        })
    }
    catch(err){
        console.log("Error",err)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}
async function loginUser(req,res) {
    const {userName,email,password}=req.body
    
    const user=await userModel.findOne({
        $or:[
            {userName},
            {email}
        ]
    })
    console.log(user)
    if(!user){
        res.status(401).json({
            message:"Invalid Credentials"
        })
    }
    const isPasswordValid = await bcrypt.compare(password,user.password)
    if(!isPasswordValid){
          res.status(401).json({
            message:"Invalid Credentials password doesnot match"
        })
    }
    const token = jwt.sign({
        id:user._id,
        role:user?.role
    },process.env.JWT_SECRET)
    res.cookie('token',token)
     res.status(200).json({
            message:"Logging you successfully",
            user:user
        })
}

module.exports = { registerUser , loginUser }
