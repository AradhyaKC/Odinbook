const User=require('../models/User');
const express = require('express');
const {body,validationResult}=require('express-validator');
var router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/',[
  body('first_name','First Name cannot be empty').trim().isLength({min:1,max:20}).escape(),
  body('last_name','Last Name cannot be empty').trim().isLength({min:1,max:20}).escape(),
  body('email','Email is required').trim().isLength({min:1,max:20}).escape(),
  body('email',"Email entry should be a valid email address").isEmail(),
  body('password','should not be emplty and within 3-20 letters/numbers').trim().isLength({min:2,max:20}).escape(),
  // body('email','there already exist an account with this email').custom(async (emailValue)=>{
  //   return User.find({email:emailValue}).exec(function(err,result){
  //     if(err) return next(err);
  //     console.log(result.length==0);
  //     return (result.length==0);
  //   });
  // }),
  async function(req,res,next){
    var {first_name,last_name,email,password} = req.body;
    const errors = validationResult(req);
    
    await bcrypt.hash(password,3,function(err,hash){
      password=hash;
    });
    
    await User.find({email:email}).exec(function(err,result){
      if(err) return next(err);
      
      var newArray;
      newArray =errors.array();
      if(result.length!=0) {
        newArray.push({param:'email',msg:'there already exists an account with this email address',location:'body'});
      }
      
      if(newArray.length!=0){
        return res.status(100).json({errors:newArray});
      }
      var newUser= new User({first_name,last_name,email,password});
      newUser.save((err)=>{
        // console.log(err);
        if(err) return next(err);
      });
      return res.status(200).json({errors:undefined});
    });
  }
]);

router.post('/LogIn',function(req,res,next){
  // console.log(req);
  passport.authenticate('local',(error,user,info)=>{
    // console.log('the user ' +user);
    // console.log('the error Obj= ' +error);
    if(error) return res.status(500).json({message:error ||'something happenned (failed to authenticate user)'});
    if(!user) return res.status(500).json({message:info.message});
    // req.logIn(user,err=>{
    //   if(err) throw err; // should not throw errors on server;
    //   // res.status(200).json({message:})
    //   //res.send('succesfully Authenticated');
    // });
    user['password'] =undefined;
    return res.status(200).json({message:'success',user});
  })(req,res,next);
});

module.exports = router;
