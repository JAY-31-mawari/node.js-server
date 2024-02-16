const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')

const userSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            maxlength:50,
        },
        email:{
            type:String,
            required:[true,'Please Provide Email'],
            unique:true,
        },
        password:{
            type:String,
            required:[true,'Please Provide Password. Password should be length for safety purpose'],
            minlength:6,
        },
    }
)

userSchema.pre('save',async function(){
    const salt=await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password,salt)
})

userSchema.methods.comparePassword=async function(candidatePassword){
    const isMatch=await bcrypt.compare(candidatePassword,this.password)
    return isMatch
}


module.exports=mongoose.model('User',userSchema)