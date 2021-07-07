const mongoose = require('mongoose')
const UserSchema= new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    pic:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZctm1sgoeEa5taYa3ZeYgRIx2yDdSlGhwAQ&usqp=CAU"

    }
})

mongoose.model('User',UserSchema)