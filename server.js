const express = require('express')
const app = express()
const db = require("./db")
require('dotenv').config();
const passport = require('./auth');


const PORTL = process.env.PORT || 8000;


const bodyParser = require('body-parser')
app.use(bodyParser.json())

// MiddelWare Function
let logRequest = (req,res,next) =>{
  console.log(`${new Date().toLocaleString()} Reqst mad : ${req.orignalUrl} `)
  next()
}

app.use(logRequest)


app.use(passport.initialize())
  
const localAuth = passport.authenticate('local',{session:false})


app.get('/',function (req, res) {    
  res.send("WelCome To Pmart-Store")
})
//import The Employe List
const employesRouter = require('./router/employeRouter')
app.use('/employee',employesRouter)

// impoert The Product List
const productRouter = require('./router/productRouter');
const Employee = require('./models/employes');
app.use('/product',productRouter)


//just cheacking
app.listen(PORTL,()=>{
    console.log("The Server Work Succesfully")
})