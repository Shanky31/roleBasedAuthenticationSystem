const jwt = require('jsonwebtoken')
const {body,validationResult}=require('express-validator')

async function authArtist(req,res,next){
       const token = req.cookies.token
        if(!token){
            return res.status(401).json({
                message:"User is not Authorized"
            })
        }
        try{
                const decoded=jwt.verify(token,process.env.JWT_SECRET)
                if(decoded?.role!=='artist'){
                     return res.status(403).json({
                message:"User is does not have access"
            })
        }
        req.user=decoded
        next();
    
        }catch(error){
             return res.status(401).json({
                message:"User is not Authorized ABCD",
                error:error
            })
        }
}

const validate=(req,res,next)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    next()
}

const validateLogin=[
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long'),
    validate
]
const validateRegister=[
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long'),
    body('userName').notEmpty().withMessage('User name is required'),
    // body('role').isIn(['user','artist']).withMessage('Invalid role'),
    validate
]
module.exports={authArtist,validate,validateLogin,validateRegister}