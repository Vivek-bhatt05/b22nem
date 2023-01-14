const express=require("express")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const {UserModel} = require("../models/User.model")
require('dotenv').config()

const userRouter=express.Router()


userRouter.post("/register",async(req,res)=>{
    const {name,email,pass,age}=req.body
    try{
        bcrypt.hash(pass, 5, async(err, hash) =>{
            if(err){
                console.log(err)
            }else{
                const user= new UserModel({name,email,pass:hash,age})
                await user.save()
                res.send("Registered user")
            }
        });
    }catch(err){
        res.send("error in registering")
        console.log(err)
    }
}) 


userRouter.post("/login",async(req,res)=>{
    const {email,pass}=req.body
    try{
        const user= await UserModel.find({email})
        if(user.length>0){
            const hashedPass=user[0].pass
            bcrypt.compare(pass, hashedPass, (err, result)=>{
                if(result){
                    const token = jwt.sign({"userID":user[0]._id}, process.env.Key);
                    res.send({"msg":"Login Successful","token":token})
                }else{
                    res.send("Wrong Credentials")
                }
            });
        }else{
            res.send("Wrong Credentials")
        }
    }
    catch(err){
        res.send("error in login")
        console.log(err)
    }
}) 




module.exports={
    userRouter
}
