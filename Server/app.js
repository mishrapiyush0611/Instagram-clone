const express = require('express')
const app=express()
const mongoose= require('mongoose')
const {mongourl}=require('./config/keys')
const PORT =process.env.Port ||9000
mongoose.connect(mongourl,{
    useNewUrlParser: true,
    useUnifiedTopology:true
})
mongoose.connection.on('connected',()=>{
    console.log('connected to mongodb')
})
require('./models/post')
require('./models/user')
app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))

if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'))
    const path=require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}
app.listen(PORT,()=>{
    console.log('server is ruuning')
})