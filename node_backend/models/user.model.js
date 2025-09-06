import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"


const userSchema= new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: [4, "username must be atleast 4 character long"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [10, "Email must be atleast 4 character long"]
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
    }
})
userSchema.methods.generateToken= async function(){

    const token = jwt.sign({id:this._id, username: this.username}, process.env.TOKEN_SECRET)

    this.token=token
    await this.save()
    
    return token
}
userSchema.statics.generateHashPassword= async (password)=>{

    return  await bcrypt.hash(password, 10)
}
userSchema.methods.comparePassword= async function(password){
    return await bcrypt.compare(password, this.password)
}

export const userModel= mongoose.model("User", userSchema)

