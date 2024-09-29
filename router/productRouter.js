
const express = require('express')
const router  = express.Router();


//Import The Product Details
const Product = require('../models/product')


// Create A Product Data Post Data

router.post('/', async (req,res) => {
  try{
    const data = req.body
    //Create A Empploye Database  emplyee model
    const newEmployee = new Product(data)

    // save The Employee Database
    const saveEmployee = await newEmployee.save()
    console.log("Product DataBase Saved")
    res.status(200).json(saveEmployee)
       

   }
   catch(error){
    console.log(error)
    res.status(500).json({Error:"Internal Server ERRROR"})
   }
})

// create a get method for product
router.get('/',async (req,res)=>{

  try{
      const data = await Product.find()
      console.log("Get The Product Data")
      res.status(200).json(data)
  }
  catch(err){
    console.log(err)
    res.status(500).json({Error:"Internal Server Error"})
  }
})



// Parametrized Api for Product
router.get('/:workType', async(req,res)=>{
try{
  const workType = req.params.workType;
  if(workType === 'Electronics' || workType === 'Clothing' || workType === 'Food' || workType === 'Furniture' || workType === 'Accessories')
  {
    const response = await Product.find({Category:workType})
    console.log('response fetched')
    res.status(200).json(response)
  }
  else{
    res.status(404).json({error:"Invalid Work Type"})
  }
}
catch(err){
  console.log(err)
    res.status(500).json({Error:"Internal Server Error"})
}
})

//Update The Product


router.put('/:id', async (req,res)=>{
    
    try{
   const empId =req.params.id;
   const UpdateData = req.body;

   const response = await Product.findByIdAndUpdate(empId,UpdateData,{
    new:true,
    runValidators:true, 
})
if(!response){
    return res.status(404).json({ERROR:"iNVALID"})
   }
 console.log("Data Is Update")
 res.status(200).json(response)
    }
    catch(err){
console.log(err)
res.status(500).json({Error:"Invalid Data"})
    }
})

 //Delete The Product Data

    
 router.delete('/:id', async (req,res)=>{
    
    try{
   const empId =req.params.id;
   
   const response = await Product.findByIdAndDelete(empId)
if(!response){
return res.status(404).json({ERROR:"iNVALID"})
}
 console.log("Data Is Delted")
 res.status(200).json(response)
    }
    catch(err){
console.log(err)
res.status(500).json({Error:"Invalid Data"})
    }
})



module.exports = router;
