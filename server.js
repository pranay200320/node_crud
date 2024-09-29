const express = require('express')
const app = express()
const db = require("./db")

const bodyParser = require('body-parser')
app.use(bodyParser.json())


app.get('/', function (req, res) {    
  res.send("WelCome To Pmart-Store")
})

//import The Employe List
const employesRouter = require('./router/employeRouter')
app.use('/employee',employesRouter)

// impoert The Product List
const productRouter = require('./router/productRouter')
app.use('/product',productRouter)

app.listen(2000,()=>{
    console.log("The Server Work Succesfully")
})