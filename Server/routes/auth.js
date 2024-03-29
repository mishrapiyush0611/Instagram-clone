const express = require('express')
router= express.Router()
const mongoose =require('mongoose')
const User = mongoose.model("User")
const bcrypt= require('bcrypt')
const jwt= require('jsonwebtoken')
const {JWT_SECRET}=require('../config/keys')
const RequireLogin = require('../middleware/RequireLogin')
const nodemailer=require('nodemailer')
const sendgridtransport=require('nodemailer-sendgrid-transport')


const transporter=nodemailer.createTransport(sendgridtransport({
    auth:{
        api_key:"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"
    }
}))

router.post('/signup',(req,res)=>{
    
    const {name,email,password,pic}=req.body
    if(!email || !password ||!name ){
        return res.json({error:'please enter all fields'})
    }
    res.json({
       message:"succesfully done"
    })
    
    User.findOne({email:email })
    .then(saveduser=>{
        if(saveduser){
           return res.json({error:"the User already exist"})
        }
        bcrypt.hash(password,12)
    .then(hashedpassword=>{
        const user= new User({
           
            email,
            password:hashedpassword,
            name,
            pic
            
        })
        user.save()
        .then(user=>{
            transporter.sendMail({
                to:user.email,
                from:"no-reply@insta.com",
                subject:"Signup Success",
                html:"<h1>Welcome to Instagram</h1>"
            })
            res.json({message:"the user is saved succesfully"})
        })
        .catch(err=>{
            console.log(err)
        })
    })
        
    })
    .catch(err=>{
        console.log("error")
})

})
router.post('/login',(req,res)=>{
    const{name,email,password}=req.body
    
    User.findOne({email:email })
    .then(saveduser=>{
        
        if(!saveduser){
           return res.json({error:"Invalid Password"})
        }
    
    bcrypt.compare(password,saveduser.password)
    .then(doMatch=>{
        if(doMatch){
            
            const token=jwt.sign({_id:saveduser._id}, JWT_SECRET, {
                expiresIn: 100000
               },)
               const {_id,name,email,pic}=saveduser
            res.json({token,user:{_id,name,email,pic}})
            // res.json({message:"user registered succefully"})
        }
        else{
         return res.json({error:"Invalid Username And  Password"})
        }
        })
    .catch(err=>{
        console.log({error:"error occcured", err})
    })
})
})
module.exports=router