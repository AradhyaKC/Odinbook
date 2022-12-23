import { useTheme } from '@emotion/react';
import { Divider, Hidden, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import UserImg from "../../assets/User.png";
import {IconButton} from '@mui/material';
import Delete from '@mui/icons-material/Delete';
import ThumbUp from '@mui/icons-material/ThumbUp';
import Comment from '../Comment/Comment';
import config from '../../config.json';
import { useEffect, useState } from 'react';
import Collapse from '@mui/material/Collapse';


function Post(props){
    const theme = useTheme();
    const {postobj,handlepostdeletion,keyindex} =props;
    var newProps= {...props};
    newProps['postobj']=undefined;
    newProps['handlepostdeletion']=undefined;
    newProps['keyindex']=undefined;

    const loggedInUser= JSON.parse(window.sessionStorage.getItem('user'));
    
    const [postObj, setPostObj] = useState({});
    useEffect(()=>{
        setPostObj(postobj);
    },[postobj]);

    if(postObj=='' || postObj==undefined || Object.keys(postObj).length==0){
        return (<div></div>);
    }

    const onLikeClick =async(e)=>{
        e.preventDefault();
        var response = await fetch(config.EXPRESS_APP_BASE_URL+'/users/'+postObj.postedBy._id+'/posts/'+postObj._id+'/likes',{
            method:"PUT", body :JSON.stringify({likedBy:loggedInUser._id}), mode:'cors',headers:{'content-type':'application/json'}
        });
        response = await response.json();
        // console.log(response.post);
        setPostObj(response.post);
    }

    const onDeleteClick=async(e)=>{
        e.preventDefault();
        var response = await fetch(config.EXPRESS_APP_BASE_URL+'/users/'+postObj.postedBy._id+'/posts/'+postObj._id,{
            method:'DELETE',mode:'cors',body:JSON.stringify({deletedBy:loggedInUser._id}),headers:{'content-type':'application/json'}
        })
        response= await response.json();
        if(response.message=='success')
            handlepostdeletion(keyindex);
    }

    return (
    <Box  {...newProps} borderRadius='5px' sx={{backgroundColor:(theme.palette.mode=='light'?'white':'grey.800'),width:'100%',overflow:'hidden'}} >
        <Box sx={{backgroundColor:(theme.palette.mode=='light'?'grey.300':'grey.A700'),display:'flex',flexDirection:'row',padding:'7px',
        alignItems:'center',paddingLeft:'15px'}}>
            <img src={config.EXPRESS_APP_BASE_URL+'/users/'+postObj.postedBy._id+'/profileImage'} style={{width:'35px',height:'35px'}} />
            <div style={{overflow:'hidden',flexGrow:'1',width:'0px',textAlign:'left',marginLeft:'5px'}}>
                <Typography fontWeight='500' color='text.primary' fontSize='1.2rem'>{postObj.postedBy.first_name +' '+postObj.postedBy.last_name}</Typography>
                <Typography fontSize='0.7rem' color='text.secondary'> posted on {postObj.postedOn.slice(0,16)}</Typography>
            </div>
            {loggedInUser._id==postObj.postedBy._id && <div style={{flexGrow:0,textAlign:'right'}}>
                <IconButton onClick={onDeleteClick} > <Delete sx={{color:'error.dark'}} /> </IconButton>
            </div>}
        </Box>
        <Divider/>
        <div style={{textOverflow:'wrap'}}>
            <Typography color='text.primary' sx={{textAlign:'left',padding:'7px',paddingLeft:'15px'}}>{postObj.description}</Typography>
        </div>
        <Divider variant='middle'/>
        <Box sx={{textAlign:'right',padding:'5px',paddingRight:'10px'}}>
            {/* when liked color changes to primary.dark and unliked to default(unspecified)  */}
            <Typography fontSize="0.9rem" color='text.secondary'> <IconButton onClick={onLikeClick}> <ThumbUp sx={{
                color:`${postObj.likes.includes(loggedInUser._id)?'primary.dark':''}`,width:'20px'
                }}/></IconButton>
                {postObj.likes.length} Like {postObj.comments.length} Comment
            </Typography>
        </Box>
        <Box>
            <Collapse in={false}>
                <Typography> Hwllo from comment </Typography>
            </Collapse>
        </Box>
        <Box sx={{backgroundColor:(theme.palette.mode=='light'?'grey.300':'grey.A700'),width:'100%',padding:'5px',boxSizing:'border-box'}} >
            {/* Comments */}
            <Comment>

            </Comment>
        </Box>
    </Box>
    );
}
export default Post;