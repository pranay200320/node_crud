const mongoose = require('mongoose');

const bcrypt = require('bcrypt')
//Create THe Employees schema
const employeSchema = new mongoose.Schema({
    Name : {
        type:String,
        required:true
    },
    Age:{
        type:Number,
        required:true,

    },
    Positions:{
        type:String,
        enum:['Saler','Filed','Casher','Secuerity'],
        required:true
    },
    Mobile:{
        type:String,
        required:true,
        unique:true,

    },
    Email:{
        type:String,
        required:true,
        unique:true,
    },
    Address:{
        type:String,
        required:true,

    },
    Salary:{
        type:Number,
        required:true
    }
    // username:{
    //     required:true,
    //     type:String
    // },
    // password:{
    //     required:true,
    //     type:String
    // }
})

// pre is middel ware fuction is trigger when "save"  opretions we perform

employeSchema.pre('save', async function(next) {
  //person is pre-middel ware function were employee data store
    const person = this;


    // Hash the password only if it has been modifed (or is new)

    if(!person.isModified('password')) return next();

    try{

     // hash password genertion
     //genSalt is genreted the 10 digt password
     const salt = await bcrypt.genSalt()

     //hash password
     const hashPassword = await bcrypt.hash(person.password,salt)
     // override the plain password with hashed one
     person.password = hashPassword;
        next();
    }
    catch(err){
  next(err)
    }
}
)
employeSchema.methods.comparePassword= async function(canddidatePassword){
    try{
             const isMatch = await bcrypt.compare(canddidatePassword,this.password)
             return isMatch;
    }
    catch(err){
        throw err;
    }
}
// employeSchema.methods.comparePassword = function(candidatePassword) {
//     return bcrypt.compare(candidatePassword, this.password);
// };

//Create A model
const Employee = mongoose.model('Employee',employeSchema)

module.exports = Employee;