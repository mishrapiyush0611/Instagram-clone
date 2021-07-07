const express = require('express')
router= express.Router()
const mongoose =require('mongoose')
const RequireLogin = require('../middleware/RequireLogin')
const Post =mongoose.model("Post")
const User =mongoose.model("User")

router.get('/user/:id',RequireLogin,(req,res)=>{
    User.findOne({_id:req.params.id})
    .select("-password")
    .then(user=>{
        Post.find({postedBy:req.params.id})
        .populate("postedBy","_id name")
        .exec((err,posts)=>{
            if(err){
                res.json("error Occured")
            }
            res.json({user,posts})
        })

    }).catch(err=>{
        res.json("user not found")
    })
})


module.exports = router