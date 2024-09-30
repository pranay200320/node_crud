const express = require('express')
const router  = express.Router();


// Import The Emplooye Model
const Emplooye = require('../models/employes')

// Get The Emplooyes Data

router.get('/',async (req,res)=>{

    try{
        const data = await Emplooye.find()
        console.log("Get The Emplooyes Data")
        res.status(200).json(data)
    }
    catch(err){
      console.log(err)
      res.status(500).json({Error:"Internal Server Error"})
    }
  })

  // POST METHOD
  
router.post('/', async (req, res) => {    
    try{
     const data = req.body
     //Create A Empploye Database  emplyee model
     const newEmployee = new Emplooye(data)
 
     // save The Employee Database
     const saveEmployee = await newEmployee.save()
     console.log("Employee DataBase Saved")
     res.status(200).json(saveEmployee)
        
 
    }
    catch(error){
     console.log(error)
     res.status(500).json({Error:"Internal Server ERRROR"})
    }
 })

 // Create A Peramerize Opretion API for 

router.get('/:workType', async(req,res)=>{
    try{
      const workType = req.params.workType;
      if(workType === 'Saler' || workType === 'Secuerity')
      {
        const response = await Emplooye.find({Positions:workType})
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
 

    // Create A Data Of Put Or Update List
  
    router.put('/:id', async (req,res)=>{
    
        try{
       const empId =req.params.id;
       const UpdateData = req.body;

       const response = await Emplooye.findByIdAndUpdate(empId,UpdateData,{
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


    //Delete The Employee Data

    
    router.delete('/:id', async (req,res)=>{
    
        try{
       const empId =req.params.id;
       
       const response = await Emplooye.findByIdAndDelete(empId)
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