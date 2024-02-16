const infomiddleware=(req,res,next)=>{
    console.log(req.path," ",req.method," ",new Date().getDate())
    next()
}

module.exports=infomiddleware