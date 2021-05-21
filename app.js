const express=require('express');
const app=express();
const path=require("path");
const hbs=require("hbs");
const router=express.Router();
const fs=require('fs');
const port=process.env.PORT || 5000;
require("./src/db/conn.js");
const Register=require("./src/models/register.js");

const static_path=path.join(__dirname,"/views");
const template_path=path.join(__dirname,"templates/views");
const partials_path=path.join(__dirname,"templates/partials");



app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
app.set("view engine","hbs")
app.set("views",template_path);
hbs.registerPartials(partials_path);

const publicDirectory = path.join(__dirname, '/public/images');
app.use(express.static(publicDirectory));

app.use(express.static(__dirname + '/public/js'));
const publicfonts = path.join(__dirname, '/public/fonts');
app.use(express.static(publicfonts));
const publiccss = path.join(__dirname, '/public/css');
app.use(express.static(publiccss));
// app.use(express.static('images'));
app.use(express.static('js'));

app.get("/",(req,res)=>{
res.render("index");
});
app.get("/register",(req,res)=>{
    res.render("register");
});
app.get("/login",(req,res)=>{
    res.render("login");
});
app.get("/registertherapist",(req,res)=>{
    res.render("registertherapist");
});
app.get("/logintherapist",(req,res)=>{
    res.render("logintherapist");
});
app.get("/userdashboard",(req,res)=>{
    res.render("userdashboard")
});
app.post("/userdashboard",async(req,res)=>{
    res.render("userdashboard");
});
app.get("/motivation_index",(req, res)=>{
    res.render("motivation_index");
});
app.post("/motivation_index",async(req,res)=>{
    res.render("motivation_index");
});
app.get("/journalindex",(req, res)=>{
    res.render("journalindex");
});
app.post("/journalindex",async(req,res)=>{
    res.render("journalindex");
});
app.get("/todoindex",(req, res)=>{
    res.render("todoindex");
});
app.post("/todoindex",async(req,res)=>{
    res.render("todoindex");
});
app.get("/notes",(req, res)=>{
    res.render("notes");
});
app.post("/notes",async(req,res)=>{
    res.render("notes");
});
app.get("/habitindex",(req, res)=>{
    res.render("habitindex");
});
app.post("/habitindex",async(req,res)=>{
    res.render("habitindex");
});
//create a new user un our db
app.post("/register",async(req,res)=>{
    try {
     const password=req.body.password;   
     const passwordConfirm=req.body.passwordConfirm;
     if(password===passwordConfirm){
        const registeruser=new Register({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            passwordConfirm:req.body.passwordConfirm

        })

        const registered=await registeruser.save();
        res.status(201).render("login");
     }
     else{
         res.send("password  not matching");
     }
    } catch (error) {
        res.send(error);
        res.status(400).send("please fill details properly");
    }
});
app.post("/registertherapist",async(req,res)=>{
    try {
     const password=req.body.password;   
     const passwordConfirm=req.body.passwordConfirm;
     if(password===passwordConfirm){
        const RegisterTherapist=new Therapist({
            name:req.body.name,
            email:req.body.email,
            therapistin:req.body.therapistin,
            password:req.body.password,
            passwordConfirm:req.body.passwordConfirm

        })

        const registered=await RegisterTherapist.save();
        //res.status(201).render(registertherapist);
        res.status(201).render("logintherapist");
     }
     else{
        res.send("password  not matching");
         //res.status(201).render("logintherapist");
     }
    } catch (error) {
         res.status(400).send("please fill details properly");
    }
});
app.listen(port,()=>{
console.log('server running');
})
app.post("/login",async(req,res)=>{
    try {
        const email=req.body.email;
        const password=req.body.password;
       // console.log(`${email} and password is ${password}`);
    

       const useremail= await Register.findOne({email:email});
        // res.send(useremail);
        // console.log(useremail);
        if(useremail.password){
            res.status(201).render("userdashboard");
        }
        else{
            res.send("password are not matching");
        }

    } catch (error) {
        res.status(400).send("invalid email");
    }
})

app.post("/logintherapist",async(req,res)=>{
    try {
        const email=req.body.email;
        const password=req.body.password;

        const useremail= await Therapist.findOne({email:email});
        // res.send(useremail);
        // console.log(useremail);
        if(useremail.password===password){
            res.status(201).render("index");
        }
        else{
            res.send("password are not matching");
        }
        
    } catch (error) {
        res.status(400).send("invalid")
    }
})


