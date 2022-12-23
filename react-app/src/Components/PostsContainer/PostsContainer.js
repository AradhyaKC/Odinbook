import { Box } from "@mui/system";
import { useEffect, useImperativeHandle, useState } from "react";
import Post from '../Post/Post.js';
import { CircularProgress } from "@mui/material";
import { forwardRef } from "react";


const PostsContainer = forwardRef((props,ref)=>{
    const [postsArray,setPostsArray] = useState(undefined);
    const newProps = {...props};
    const {populatePosts} =newProps;
    newProps.populatePosts=undefined;

    useImperativeHandle(ref,()=>{
        var thisRef ={};
        thisRef.addNewPost=(postObj)=>{
            setPostsArray((prevState)=>{
                var newState = [...prevState];
                newState.push(postObj);
                return newState;
            });
        }
        return thisRef;
    });

    useEffect(()=>{
        (async()=>{
            setPostsArray(await populatePosts());
        })();
    },[]);

    const handlePostDeletion=(index)=>{
        setPostsArray((prevState)=>{
            var newState = [...prevState];
            newState.splice(index,1);
            return newState;
        });
    } 
    return (
        <Box >
            {postsArray!=undefined &&  <>
                {postsArray.length==0 && <CircularProgress/>}
                {postsArray.length!=0 &&  postsArray.map((element,index)=>{
                        return <Post keyindex={index} key={index} postobj={element} style={{marginTop:'10px'}} handlepostdeletion={handlePostDeletion}/>
                    }).reverse()}
            </>}
        </Box>
    );
});
export default PostsContainer;