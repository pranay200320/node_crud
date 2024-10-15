const express = require('express')
const router  = express.Router();


//import Jws Token
const {jwtAuthMiddleware, generateToken} = require('./../jwt');


// Import The Emplooye Model
const Emplooye = require('../models/employes')



  // POST METHOD
  //now user post data in emplloye/singup
router.post('/singup', async (req, res) => {    
    try{
     const data = req.body
     //Create A Empploye Database  emplyee model
     const newEmployee = new Emplooye(data)
 
     // save The Employee Database
     const saveEmployee = await newEmployee.save()
     console.log("Employee DataBase Saved")
     const paylod = {
      id:saveEmployee.id,
      username:saveEmployee.username
     }
     console.log(JSON.stringify(paylod))
     const token = generateToken(paylod); 
     console.log("Token Name:-",token);
     res.status(200).json({saveEmployee:saveEmployee,token:token})

    }
    catch(error){
     console.log(error)
     res.status(500).json({Error:"Internal Server ERRROR"})
    }
 })


 // Login Route
router.post('/login', async(req, res) => {
    try{
        // Extract username and password from request body
        const {username, password} = req.body;

        // Find the user by username
        const user = await Emplooye.findOne({username: username});

        // If user does not exist or password does not match, return error
        if( !user || !(await user.comparePassword(password))){
            return res.status(401).json({error: 'Invalid username or password'});
        }

        // generate Token 
        const payload = {
            id: user.id,
            username: user.username
        }
        const token = generateToken(payload);

        // resturn token as response
        res.json({token})
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Profile route
router.get('/profile', jwtAuthMiddleware, async (req, res) => {
    try{
        const userData = req.user;
        console.log("User Data: ", userData);

        const userId = userData.id;
        const user = await Emplooye.findById(userId);

        res.status(200).json({user});
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

// GET method to get the person
router.get('/', jwtAuthMiddleware, async (req, res) =>{
  try{
      const data = await Emplooye.find();
      console.log('data fetched');
      res.status(200).json(data);
  }catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal Server Error'});
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