const express = require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const crypto=require("crypto");
const nodemailer=require("nodemailer");

const app=express();
const port=8000;
const cors=require("cors");
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
const jwt=require("jsonwebtoken")

mongoose.connect("mongodb+srv://krisha:krisha@cluster0.adcgzdg.mongodb.net/",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log("Connected to Mongodb");
}).catch((err)=>{
    console.log("Error connecting to Mongodb",err);
});

app.listen(port,()=>{
    console.log("Server is running on port 8000");
})

const User = require("./models/user");
const Post = require("./models/post");
// const { profileEnd } = require("console");

//end point to register a user in the backend

app.post("/register",async(req,res) => {
    try{
        const {name,email,password,profileImage}= req.body;

        //check if the email is already registered
        const existingUser = await User.fineOne({email});
        if(existingUser){
            console.log("Email already registered");
            return res.status(400).json({message:"Email already registered"})
        }

        //create a new user if that email is new
        const newUser = new User({
            name,
            email,
            password,
            // profileImage
        });

        //generate the verification token
        newUser.verificationToken=crypto.randomBytes(20).toString("hex");

        //save the user to database
        await newUser.save();

        //send the verification token to the registered user
        sendVerificationEmail(newUser.email, newUser.verificationToken);

        res.status(202).json({
                message: "Registereation Successful. Please check your mail for verification"
            })
    }
    catch(error){
        console.log("Error registering the user",error);
        res.status(500).json({message:"Registeration failed"})
    }
});

const sendVerificationEmail = async(email,verificationToken) => {
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:"krisha.joshi.btech2021@sitpune.edu.in",
            pass:"Lon@24455"
        }
    });

    const mailOptions = {
        from: "linkedin@gmail.com",
        to:email,
        subject:"Email Verification",
        text:`Please click the following link to verify your email: http://localhost:3000/verify/${verificationToken}`
    };

    //send the mail
    try{
        await transporter.sendMail(mailOptions);
        console.log("Verification email sent successfully")
    }
    catch(error){
        console.log("Error sending the verification email")
    }
;}

//end points to verify verification email
app.get("/verify/:token"),async(req,res) => {
    try{
        const token = req.params.token;
        const user = await User.fineOne({verificationToken: token});
        if(!user){
            return res.status(404).json({message: "Invalid verification token"})
        }

        //mark the user verified
        user.verified = true;
        user.verificationToken= undefined;

        await user.save();

        res.status(200).json({message: "Email verified successfully"})
    }
    catch(error){
        res.status(500).json({message:"Email verification failed"})
    }
}

const generateSecretKey = () =>{
    const secretKey =crypto.randomBytes(32).toString("hex");
    return secretKey;
};

const secretKey=generateSecretKey();

//end point to login user
app.post("/login",async(req,res)=>{
    try{
        const {email,password}=req.body;

        //check if user already exists
        const user= await User.findOne({email});
        if(!user){
            res.status(401).json({message:"Invalid email or password"})
        }

        //check if password is correct
        if(user.password!==password){
            return res.status(401).json({message:"Invalid Password"})
        }

        const token= jwt.sign({userId:user._id},secretKey)
        res.status(200).json({token})

    }catch(error){
        res.status(500).json({message:"Login Failed"});
    }
})