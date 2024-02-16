const jwt=require('jsonwebtoken')

const authenticationMiddleware = async(req,res,next) => {
    try{
        const token=req.cookies.token
        const payload=await jwt.verify(token,process.env.JWT_SECRET)
        next()
    }catch(error){
        console.log("Authentication Failed")
        res.json({success:false,msg:"Authentication Failed"})
    }
}

module.exports=authenticationMiddleware