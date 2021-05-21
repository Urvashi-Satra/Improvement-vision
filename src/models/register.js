const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");
const userSchema=new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true,
        unique:true
    },
    password: {
        type:String,
        required:true
        
    },
    passwordConfirm: {
        type:String,
        required:true
        
    }
})

userSchema.pre("save",async function(next){
    if(this.isModified("password")){
        
        console.log(`the current password is ${this.password}`);
        this.password=await bcrypt.hash(this.password,10);
        console.log(`the current password is ${this.password}`);

        this.passwordConfirm=undefined;
    }
next();
})
//now create collection
const Register=new mongoose.model("Registers",userSchema);
module.exports=Register;