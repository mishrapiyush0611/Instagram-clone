const mongoose= require("mongoose")

const PostSchema= new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    body:{
        type:String,
        require:true
    },
    photo:{
        type:String,
        require:true
       
    },
   
})
mongoose.model("Post",PostSchema)