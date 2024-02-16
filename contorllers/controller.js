const Users=require('../models/model')
const jwt=require('jsonwebtoken')

const getusers = async(req,res) => {
    const user=await Users.find({})
    res.json({success:true,msg:user})
}

//ADDING MIDDLEWARE WHICH WILL CONDITIONALLY SEPARATE THE FUNCTIONALITY ON THE CONDITION OF req.body.type
const postuser = async(req,res) => {
    let {type}=req.body
    if(type === 'signup')
    {
        try {
            const user=await Users.create(req.body);
            let data={name:user.name,id:user._id}
            const token=jwt.sign(data,process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRY})
            
            res.cookie('token',token,{
                httpOnly:true,
                expires: new Date(Date.now() + 1000*60),
                secure:true,
            });
            res.json({success:true,msg:user})
    
        } catch (error) {
            res.json({success:false,msg:"Something went wrong"})
            console.log("Erro sign in")
        }
    }
    else if(type === 'login')
    {
        let name=req.body.name
        const user=await Users.findOne({name})
        if(!user)
        {
            return res.json({success:false,msg:"No user name registered"})
        }
        let isPasswordCorrect=await user.comparePassword(req.body.password)
        if(!isPasswordCorrect)
        {
            return res.json({success:false,msg:'password does not match'})
        }
        let data={name:user.name,id:user._id}
        const token=jwt.sign(data,process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRY})
        res.cookie('token',token,{
            httpOnly:true,
            expires: new Date(Date.now() + 1000*60),
            secure:true,
        });
        res.json({success:true,msg:user})
    }
}

//ANOTHER METHOD TO MAKE ROUTE FOR THE LOGIN OPTION AND ADD THE MIDDLEWARE INTO IT SEPARATELY
const loginuser = (req,res) => {
    console.log(req.body)
}

const updateuser = async(req,res) => {
    const {id:emailId}=req.params
    let user=await Users.findOne({email:emailId})
    if(!user)
    {
        return res.json({success:false,msg:"No users with emailId"})
    }
    user.email=req.body.email
    user.password=req.body.password
    user=await Users.create(user)
    res.json({success:true,msg:"User updated"})
}

const deleteuser = async(req,res) => {
    const {id:emailId}=req.params
    const user=await Users.findOneAndDelete({email:emailId})
    if(!user)
    {
        return res.json({msg:false,msg:"no user found"})
    }
    res.json({success:true,msg:"user deleted successfully"})
}

module.exports={getusers,postuser,loginuser,updateuser,deleteuser}