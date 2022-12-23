const User=require('../models/User');
const Post = require('../models/Post');
const express = require('express');
const {body,validationResult}=require('express-validator');
var router = express.Router({mergeParams:true});
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
                Post.findOne({_id:post._id}).populate({path:'postedBy',model:'User',select:{_id:1,first_name:1,last_name:1}}).exec((err,result)=>{
                    if(err) return res.status(500).json({message:'error', error:err});
                    console.log
                    return res.status(200).json({message:'success',post:result});
                });
                // if(err) return res.status(500).json({message:'error',errors:err});
                // return res.json({message:'success',post:post});
            });
        }
    }
    );
});

router.get('/',(req,res)=>{
    Post.find({postedBy:req.params.userId}).populate({path:'postedBy',model:'User',select:{_id:1,first_name:1,last_name:1}}).exec((err,results)=>{
        if(err){
            console.log(err);
            return res.status(500).json({message:'error',errors:err});
        } 
        // console.log(results);
        return res.status(200).json({message:'success',posts:results});
    });
    return;
});

router.put('/:postId/likes',(req,res)=>{
    Post.findOne({_id:req.params.postId}).populate({path:'postedBy',model:'User',select:{_id:1,first_name:1,last_name:1}}).exec((err,results)=>{
        var post = results;
        console.log(post);
        if(post.likes.includes(req.body.likedBy)){
            let index =post.likes.indexOf(req.body.likedBy);
            post.likes.splice(index,1);
        }else{
            post.likes.push(req.body.likedBy);
        }
        post.save((err,result)=>{
            if(err) return res.status(500).json({message:'error', error:err});
            // post.populate({path:'postedBy',model:'User',select:{first_name:1,last_name:1}})
            return res.status(200).json({message:'success',post:result});
        });
    });
});

router.delete('/:postId',(req,res)=>{
    Post.findOne({_id:req.params.postId}).exec((err,thePost)=>{
        if(err) return res.status(500).json({message:'error',error:err});
        if(req.body.deletedBy == thePost.postedBy){
            Post.deleteOne({_id:req.params.postId}).exec((err)=>{
                return res.status(200).json({message:'success'});
            });
        }else{
            return res.status(403).json({message:'error',error:'you don not have the permission to delete'});
        }
    });
    // Post.deleteOne({_id})
});

module.exports= router;