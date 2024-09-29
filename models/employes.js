const mongoose = require('mongoose');


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
})

//Create A model
const Employee = mongoose.model('Employee',employeSchema)

module.exports = Employee;