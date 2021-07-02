const express = require('express')
router= express.Router()
const mongoose =require('mongoose')
const RequireLogin = require('../middleware/RequireLogin')
const Post =mongoose.model("Post")

router.get('/allpost',RequireLogin,(req,res)=>{
    Post.find()
    .populate('postedby','_id name')
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log("error occured",err)
    })
})
router.get('/mypost',(req,res)=>{
    Post.find()
    .populate('postedby','_id name')
    .then(myposts=>{
        res.json({myposts})
    })
    .catch(err=>{
        console.log("error occured",err)
    })
})



router.post('/createpost',RequireLogin,(req,res)=>{
    
const {title,body,photo}=req.body
console.log(title,body,photo)
if(!title || !body ){
    return res.status(422).json({error:"Please Enter All the Required Fields"})
}
req.user.password=undefined
const post= new Post({
    title,
    body,
    photo
})
post.save().then(result=>{
    res.json({post:result})
})
.catch(err=>{
    res.json({error:"error Occured"})
})
})

module.exports=router