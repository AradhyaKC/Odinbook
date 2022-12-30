import { Box } from "@mui/system";
import './HomeComponent.css';
import config from '../../config.json';
import { Typography } from "@mui/material";
import PostForm from "../PostForm/PostForm";
import { useTheme } from "@emotion/react";
import FindFriendsComponent from "../FindFriendsComponent/FindFriendsComponent";

function HomeComponent(props){
    const loggedInUser= JSON.parse(window.sessionStorage.getItem('user'));
    const theme = useTheme();
    return (
    <Box id='home-flex'>
        <div id='big-div'>
            <PostForm/>
            <FindFriendsComponent style={{marginTop:'10px'}}/>
        </div>
        <div id='small-div'>
            <div style={{display:'flex',flexDirection:'row',alignItems:'center',overflow:'hidden',marginTop:'10px',justifyContent:'center'}}>
                <img src={config.EXPRESS_APP_BASE_URL+'/users/'+loggedInUser._id+'/profileImage'} style={{borderRadius:'50%',width:'100px'}}/>
                <div>
                    <Typography color='text.primary' style={{fontSize:'1.3rem',fontWeight:'500',overflow:'hidden'}} > {loggedInUser.first_name +' '+loggedInUser.last_name} </Typography>
                    <Typography color='text.primary' style={{fontSize:'0.9rem',fontWeight:'400',overflow:'hidden'}}>{loggedInUser.email}</Typography>
                </div>
            </div>
        </div>
    </Box>);
}
export default HomeComponent;