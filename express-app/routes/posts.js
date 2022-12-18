const User=require('../models/User');
const Post = require('../models/Post');
const express = require('express');
const {body,validationResult}=require('express-validator');
var router = express.Router();
// const multer = require('multer');
// const upload = multer().none();
const async = require('async');

router.post('/',
body('description').escape(),
(req,res)=>{
    async.parallel([
        (callback)=>{ //0
           User.countDocuments({_id:req.body.postedBy},callback)
        },
    ], 
    (err,results)=>{
        if(err){
            console.log(err)
            return res.status(500);
        }
        if(results[0]==1){
            var errors = validationResult(req);
            if(errors.errors.length!=0){
                return res.status(400).json({message:'error',errors:errors});
            }
            var {description,postedBy,postedOn} = req.body;
            postedOn = new Date(postedOn);
            var newPost =new Post({description,postedOn,postedBy});
            newPost.save((err,post)=>{
                if(err) return res.status(500).json({message:'error',errors:err});
                return res.json({message:'success',post:post});
            });
        }
    }
    );
});

module.exports= router;