const express = require('express')
router= express.Router()
const mongoose =require('mongoose')
const RequireLogin = require('../middleware/RequireLogin')
const Post =mongoose.model("Post")

router.get('/allpost',RequireLogin,(req,res)=>{
    Post.find()
    .populate('postedBy','name')
    .populate('comments.postedBy','_id name')
    .sort('-createdAt')
    .then(posts=>{
     
        res.json({posts})
    })
    .catch(err=>{
        console.log("error occured",err)
    })
})
router.get('/mypost',RequireLogin,(req,res)=>{
    console.log()
    Post.find({postedBy:req.user._id})
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
    photo,
    postedBy:req.user,
})
post.save().then(result=>{
    
    res.json({post:result})
})
.catch(err=>{
    res.json({error:"error Occured"})
})
})
router.put('/like',RequireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
    $push:{likes:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        else{
            res.json({result})
        }
    })
})
router.put('/unlike',RequireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
    $pull:{likes:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err){
            return res.status(422).json(err)
        }
        else{
            res.json(result)
        }
    })
})
router.put('/comment',RequireLogin,(req,res)=>{
    
    const comment={
        text:req.body.text,
        postedBy:req.user
    }
    Post.findByIdAndUpdate(req.body.postId,{
    $push:{comments:comment}
    },{
        new:true
    })
    .populate("comments.postedBy","_id name")
    .populate('postedBy','name')
    .exec((err,result)=>{
        if(err){
            return res.status(422).json(err)
        }
        else{
            res.json(result)
        }
    })
})

// router.delete('/deletepost/:postId',RequireLogin,(req,res)=>{
//     Post.findOne({_id:req.params.postId})
//     .populate("postedBy","_id name")
//     .exec((err,post)=>{
//         if(err|| !post){
//             res.json(err)
//         }
//         if(post.postedBy._id.toString()=req.user.id.toString()){
//             post.remove()
//             .then(resut=>{
//                 res.json({message:"Post deleted Successfully"})
//             })
//             .catch(err=>{
//                 console.log(err)
//             })
//         }
//     })
// })
module.exports=router