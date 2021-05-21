const mongoose=require("mongoose");

mongoose.connect("mongodb://localhost:27017/improvement",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(()=>{
    console.log(`connected successfully`);
}).catch((e)=>{
    console.log(`not connected yet`);

});