const jwt= require('jsonwebtoken')
const {JWT_SECRET}=require('../keys')
const mongoose=require('mongoose')
const User=mongoose.model('User')

module.exports=(req,res,next)=>{
    const {authorization} = req.headers
    if(!authorization){
        res.status(401).json({error:"User Must be Logged in"})
    }
  
    const token= authorization.replace("Bearer ","")
 
    jwt.verify(token,JWT_SECRET,(err,payload)=>{
       
        if(err){
            console.log("bearer")
            return res.status(402).json({error:"User must be logged in"})
        }
        else{
        const {_id}=payload
        User.findById(_id).then(userdata=>{
            req.user=userdata
            next()
        })
    
      
        }
    })
}