// auth data
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Employee = require('./models/employes')


// auth data with username and password
passport.use(new LocalStrategy(async (userName,password,done) => {

  
    //authentication logic here
    // done:- it is callback function it provied passport
    try{
    // console.log("Received Credentials:",userName,password)
    const user = await Employee.findOne({username:userName})
    if(!user)
      return done(null,false,{message:"Incorrect UserName"})
    //   const isPasswordMatch = user.password === password ? true : false;

    const isPasswordMatch = await user.comparePassword(password);

  
    
    if(isPasswordMatch){
      return done(null,user)
  
    }
    else
    {
      return done(null,false,{message:"Incoorect Password"})
    }
    }
    catch(err){
    return done(err)
    }
  }))

  module.exports = passport;
  
