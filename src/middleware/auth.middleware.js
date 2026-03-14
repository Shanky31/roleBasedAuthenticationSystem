const jwt = require('jsonwebtoken')

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
module.exports={authArtist}