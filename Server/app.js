const express = require('express')
const app=express()
const mongoose= require('mongoose')
const {mongourl}=require('./keys')
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


app.listen(9000,()=>{
    console.log('server is ruuning')
})