const mongoose=require("mongoose");
const therapistSchema=new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true,
        unique:true
    },
    therapistin: {
        type:String,
        required:true
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
//now create collection
const Therapist=new mongoose.model("Therapist",therapistSchema);
module.exports=Therapist;