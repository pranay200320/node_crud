const mongoose = require('mongoose');

//Create A MongoDb Url
require('dotenv').config();


const MongoURL = "mongodb://localhost:27017"
// const MongoURL = process.env.DB_URL


// Connect The MongoDB
 mongoose.connect(MongoURL,{
   //  useNewUrlParser:true,
   //  useUnifiedTopology:true
 })

 //Get The Defult Connection

 const db = mongoose.connection;

 db.on('connected',()=>{
    console.log(" The MongoDB DataBase Is Connected")
 })
 db.on('disconnected',()=>{
    console.log("The MongoDB Is Discinnected To The DataBase")
 })
db.on('error',(error)=>{
  console.log(error)
})

//export Db

module.exports = db