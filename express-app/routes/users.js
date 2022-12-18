const User=require('../models/User');
const express = require('express');
const {body,validationResult}=require('express-validator');
var router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt_decode = require('jwt-decode');
const multer =require('multer');
const fs=require('fs');

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

      let joinDate=new Date(Date.now());
      joinDate=joinDate.toDateString();
      joinDate=joinDate.slice(0,16);
      var newUser= new User({first_name,last_name,email,password,joinDate});
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

const upload = multer({ dest: 'uploads/' ,fileFilter: (req, file, cb) => {
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpeg' ||
      file.mimetype == 'image/jpg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      const err = new Error('Only .jpg .jpeg .png images are supported!');
      err.name = 'ExtensionError';
      return cb(err);
    }
  }
}).single('profilePicUrl');

router.patch('/:userId',(req, res,next) =>
  {
    upload(req, res, function (err)
    {
      if (err instanceof multer.MulterError) {
        console.log(err);
        res.status(500).send({error: { msg: `multer uploading error: ${err.message}` },}).end();
        return;
      } else if (err)
      {
        if (err.name == 'ExtensionError')
        {
          res.status(413).send({ error: { msg: `${err.message}` } }).end();
        } else
        {
          res.status(500).send({ error: { msg: `unknown uploading error: ${err.message}` } }).end();
        }
        return;
      }
      next();
    })
  },
  (req,res)=>{
    // console.log(req.params.userId);
    // console.log(req.body);
    User.updateOne({_id:req.params.userId},{'$set':{
      first_name:req.body.first_name, last_name:req.body.last_name, description:req.body.description,profilePicUrl:{
        'name':req.file.filename,data:fs.readFileSync('uploads/'+req.file.filename), contentType:req.file.mimetype,
      }
    }},(err, result)=>{
      if(err) return res.status(400).json({message:'error',errors:['failed to update or find existing user']});
      User.findById(req.params.userId,(err,user)=>{
        user['password']=undefined;

        return res.status(200).json({message:'success',user:user});
      });
    });

    // console.log(fs.readFileSync('uploads/'+req.file.filename));
  }
);

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
      message:'success', user:user
    });
  });
});

router.get('/:userId',function(req,res){
  console.log(req.params.userId);
});

// router.post('/:userId/posts/',
// // body('postedBy', 'the id of the user posting was invalid or the user could npt be found').custom(async (postedByUserId)=>{
// //   var user = await User.findById(postedByUserId);
// //   if(!user) return false;
// //   else return true
// // }), 
// (req,res)=>{
//   console.log(req.params.userId);
//   return res.json({tempObject:'hello'});
// });

module.exports = router;
