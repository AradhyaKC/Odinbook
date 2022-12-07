const User=require('../models/User');
const express = require('express');
const {body,validationResult}=require('express-validator');
var router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt_decode = require('jwt-decode');

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
        if(err) return next(err);
      });
      return res.status(200).json({errors:undefined});
    });
  }
]);

router.post('/LogIn',function(req,res,next){
  passport.authenticate('local',(error,user,info)=>{
    if(error) return res.status(500).json({message:error ||'something happenned (failed to authenticate user)'});
    if(!user) return res.status(500).json({message:info.message});
    user['password'] =undefined;
    return res.status(200).json({message:'success',user});
  })(req,res,next);
});

router.get('/auth/google',
  passport.authenticate('google',{scope:['email','profile']})
);

router.get('/auth/google/callback',
  passport.authenticate('google'),
  function(req,res,next){
    console.log(req.user);
    return res.status(201).json({
      message:'success',
      user:{
        id:req.user._id, first_name:req.user.first_name, last_name:req.user.last_name,email:req.user.email,
        googleId:req.user.googleId,password:undefined
      }
    });
  }
);


router.post('/auth/google/token',function(req,res,next){
  var decoded = jwt_decode(req.body.token);
  User.findOrCreate({
    googleId:decoded.sub,
    first_name:decoded.given_name,
    last_name:decoded.family_name,
    email:decoded.email,
  },(err,user)=>{
    if(err) return next('failed in finding or creating google account');
    return res.status(201).json({
      message:'token success', user:user
    });
  });
});

module.exports = router;
