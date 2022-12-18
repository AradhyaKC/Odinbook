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
            var newPost =new Post({description,postedOn,postedBy});
            newPost.save((err,post)=>{
                if(err) return res.status(500).json({message:'error',errors:err});
                return res.json({message:'success',post:post});
            });
        }
    }
    );
});

router.get('/:userId',(req,res)=>{
    Post.find({postedBy:req.params.userId}).populate({path:'postedBy',model:'User',select:{first_name:1,last_name:1,profilePicUrl:1}}).exec((err,results)=>{
        if(err){
            console.log(err);
            return res.status(500).json({message:'error',errors:err});
        } 
        // console.log(results);
        return res.status(200).json({message:'success',posts:results});
    });
    return;
});

module.exports= router;