import { useTheme } from "@emotion/react";
import { Collapse, Divider, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import UserImg from "../../assets/User.png";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import Delete from "@mui/icons-material/Delete";
import AddComment from '@mui/icons-material/AddComment';
import config from '../../config.json';


import TreeView from '@mui/lab/TreeView';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ChevronRight from '@mui/icons-material/ChevronRight';
import TreeItem, { useTreeItem } from '@mui/lab/TreeItem';
import clsx from 'clsx';
import PostForm from "../PostForm/PostForm";

const CustomContent = forwardRef(function CustomContent(props, ref) {
  const loggedInUser= JSON.parse(window.sessionStorage.getItem('user'));
  const theme = useTheme();
  const [showCommentForm,setShowCommentForm] = useState(false);
  // const {commentobj} = props;
  const [commentObj,setCommentObj] =useState(()=>{
    const {_id,description,postedOn,postedBy,comments,parentPost,}=props;
    return {_id,description,postedOn,postedBy,comments,parentPost};
  });
  // const customContentRef= useImperativeHandle(ref,)

  useEffect(()=>{
    // const {_id,description,postedOn,postedBy,comments,parentPost}=props;
    // setCommentObj({_id,description,postedOn,postedBy,comments,parentPost});
  },[]);
  
  const {
    classes,
    className,
    label,
    nodeId,
    icon: iconProp,
    expansionIcon,
    displayIcon,
    keyindex,
    handlepostdeletion,
    ...newProps
  } = props;

  const {
    disabled,
    expanded,
    selected,
    focused,
    handleExpansion,
    handleSelection,
    preventSelection,
  } = useTreeItem(nodeId);


  const icon = iconProp || expansionIcon || displayIcon;

  const handleMouseDown = (event) => {
    preventSelection(event);
  };

  const handleExpansionClick = (event) => {
    handleExpansion(event);
  };

  const handleSelectionClick = (event) => {
    handleSelection(event);
  };
  const onShowCommentClick=(e)=>{
    e.preventDefault(); 
    setShowCommentForm(!showCommentForm);
  }
  const onDeleteClick=async(e)=>{
    e.preventDefault();
    var response = await fetch(config.EXPRESS_APP_BASE_URL+'/users/'+commentObj.postedBy._id+'/posts/'+commentObj._id,{
        method:'DELETE',mode:'cors',body:JSON.stringify({deletedBy:loggedInUser._id}),headers:{'content-type':'application/json'}
    })
    response= await response.json();
    if(response.message=='success')
        handlepostdeletion(keyindex);
  }

  return (
  <Box  {...newProps} sx={{backgroundColor:(theme.palette.mode=='light'?'white':'grey.800'),borderRadius:'5px',
  display:'flex',flexDirection:'column',width:'-moz-available',marginTop:'5px'}} onMouseDown={handleMouseDown} ref={ref} style={{padding:'0px'}}>
    { (commentObj!=undefined && Object.keys(commentObj).length!=0) && <>
      {/* {console.log(commentObj)} */}
      <Box sx={{display:'flex',flexDirection:'row',width:'stretch'}}>
        {commentObj.comments.length!=0 && <div style={{alignSelf:'center',marginLeft:'5px'}} onClick={handleExpansionClick} className={classes.iconContainer}>
          {icon}
        </div>}
        <img src={config.EXPRESS_APP_BASE_URL+'/users/'+commentObj.postedBy._id+'/profileImage'} style={{width:'22px',height:'22px',alignSelf:'center',marginLeft:'5px',marginRight:'3px'}}/>
        <div>
          <Typography color='text.primary' fontSize='0.8rem' sx={{alignSelf:'center',marginRight:'3px',textAlign:'left'}}>{commentObj.postedBy.first_name+' '} 
          {commentObj.postedBy.last_name}</Typography>
          <Typography color='text.secondary' fontSize='0.8rem' sx={{alignSelf:'center'}}> Commented on {commentObj.postedOn.slice(0,16)}</Typography>
        </div>
        <div style={{flexGrow:1,textAlign:'right',minWidth:'max-content'}}>
          <IconButton onClick={onShowCommentClick}> <AddComment sx={{color:`${showCommentForm?'primary.dark':''}`}}/> </IconButton>
          {commentObj.postedBy._id==loggedInUser._id && <IconButton onClick={onDeleteClick}> <Delete sx={{color:'error.dark'}}/></IconButton>}
        </div>
      </Box>
      
      <Divider style={{width:'100%'}} variant="middle"/>
      <Typography mt='2px' ml='5px' color='text.primary' sx={{textAlign:'left',alignSelf:'flex-start'}}>{commentObj.description}</Typography>
      <Collapse in={showCommentForm}>
        <PostForm parentpost={commentObj._id}/>
      </Collapse>
    </>}  
  </Box>
  );
});

function CustomTreeItem(props) {
  return <TreeItem ContentComponent={CustomContent} {...props} />;
}

function Comment(props){
    const {commentobj,handlepostdeletion,...newProps} =props;
    const propsObject ={...commentobj,handlepostdeletion};

    return (
    <TreeItem nodeId={commentobj._id} ContentProps={propsObject} label='something ' ContentComponent={CustomContent} {...newProps}>
      {commentobj.comments.map((element,index)=>{ 
        return <TreeItem key={index} nodeId={element._id} ContentProps={element} ContentComponent={CustomContent} {...props}/>
      })}
    </TreeItem>
    );
}

export default Comment;