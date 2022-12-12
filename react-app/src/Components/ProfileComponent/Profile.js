import './Profile.css';
import Box from '@mui/material/Box';
import { useTheme } from '@emotion/react';
import { Button, Divider, IconButton, Typography } from '@mui/material';
import { dark } from '@mui/material/styles/createPalette';
import UserImg from "../../assets/User.png";
import PostForm from '../PostForm/PostForm.js';
import Post from '../Post/Post.js';
import Check from '@mui/icons-material/Check';
import Close from '@mui/icons-material/Close';

//new user fields : description , joinDate , birthDate? , FriendList , PostList 

function Profile(props){
    var theme = useTheme();
    const loggedInuser= JSON.parse(window.sessionStorage.getItem('user'));
    const personProfile = JSON.parse(window.sessionStorage.getItem('user')); // swap it with profile of person 

    return (
        // sx={{borderColor:'text.primary',borderWidth:'2px',borderStyle:'solid',borderRadius:'4px'}}
        <Box id='profile-flex' >
            <div id='small-div'>

                {/* PersonInfo */}
                <div style={{display:'flex',flexDirection:'row',alignItems:'center',overflow:'hidden'}}>
                    <img src={UserImg} style={{borderRadius:'50%',width:'100px'}}/>
                    <div>
                        <Typography color='text.primary' style={{fontSize:'1.3rem',fontWeight:'500',overflow:'hidden'}} > {personProfile.first_name +' '+personProfile.last_name} </Typography>
                        <Typography color='text.primary' style={{fontSize:'0.9rem',fontWeight:'400',overflow:'hidden'}}>{personProfile.email}</Typography>
                    </div>
                </div>

                {/* About Me  */}
                <Box mt='10px' sx={{backgroundColor:(theme.palette.mode=='light'?'white':'grey.800'),}} borderRadius='5px' >
                    <Box sx={{backgroundColor:(theme.palette.mode=='light'?'primary.main':'background.paper'),textAlign:'left', borderRadius:'5px 5px 0px 0px'}} >
                        <Typography color='white' ml='7px' style={{fontSize:'1.2rem'}}> About me</Typography> 
                    </Box>
                    <Typography color='text.primary' padding='5px' sx={{textAlign:'left',paddingLeft:'10px'}}>
                        {(personProfile.description==''||personProfile.description==undefined)?'Hello there , I am using Odinbook':personProfile.description}
                    </Typography>
                    <Divider/>
                    <Box color='text.secondary' style={{textAlign:'left',fontSize:'0.9rem',padding:'3px'}} ml='4px'> Member since {(personProfile.joinDate==undefined)?'August 2021':personProfile.joinDate }</Box>
                </Box>
                
                {/* Add Friend */}
                {loggedInuser._id!=personProfile._id  && <Box sx={{marginTop:'20px',textAlign:'right',paddingRight:'10px'}}>
                    <Button variant='contained' > Add Friend </Button>
                </Box >}

                {/* Friend Req */}
                <Box sx={{backgroundColor:(theme.palette.mode=='light'?'white':'grey.800')}} mt='20px' borderRadius='5px'>
                    <Box sx={{backgroundColor:(theme.palette.mode=='light'?'primary.main':'background.paper'),
                    textAlign:'left',borderRadius:'5px 5px 0px 0px'}}>
                        <Typography  color='white' ml='7px' style={{fontSize:'1.2rem'}}>Pending Friend Requests</Typography>
                    </Box>
                    <div style={{display:'flex',flexDirection:'row',padding:'5px',alignItems:'center',overflow:'hidden'}}> 
                        <div style={{display:'flex',flexDirection:'row',width:'0px',flexGrow:1,overflow:'hidden',verticalAlign:'center'}}>
                            <img src={UserImg} style={{width:'35px',height:'35px',borderRadius:'50%',marginLeft:'10px'}}/>
                            <Typography color='text.primary' mt='5px' ml='10px' fontSize='1.1rem'> IAmUserFriend</Typography>
                        </div>
                        <div style={{display:'flex',flexDirection:'row', flexWrap:'nowrap',textAlign:'right',paddingRight:'10px',width:'max-content'}}>
                            <IconButton><Check sx={{color:'info.main'}}/> </IconButton>
                            <IconButton> <Close sx={{color:'error.main'}} /></IconButton>
                        </div>
                    </div>
                </Box>

                {/* Friend List */}
                <Box sx={{backgroundColor:(theme.palette.mode=='light'?'white':'grey.800')}} mt='20px' borderRadius='5px'>
                    <Box sx={{backgroundColor:(theme.palette.mode=='light'?'primary.main':'background.paper'),textAlign:'left',borderRadius:'5px 5px 0px 0px'}}>
                        <Typography  color='white' ml='7px' style={{fontSize:'1.2rem'}}>Friends</Typography>
                    </Box>
                    <div style={{display:'flex',flexDirection:'row',padding:'5px'}}> 
                        <img src={UserImg} style={{width:'25px',borderRadius:'50%',marginLeft:'10px'}}/>
                        <Typography color='text.primary' ml='10px' fontSize='1.1rem'> IAmUserFriend</Typography>
                    </div>
                    <Divider/>
                    <div style={{display:'flex',flexDirection:'row',padding:'5px'}}> 
                        <img src={UserImg} style={{width:'25px',borderRadius:'50%',marginLeft:'10px'}}/>
                        <Typography color='text.primary' ml='10px' fontSize='1.1rem'> IAmUserFriend</Typography>
                    </div>
                    <Divider/>
                    <div style={{display:'flex',flexDirection:'row',padding:'5px'}}> 
                        <img src={UserImg} style={{width:'25px',borderRadius:'50%',marginLeft:'10px'}}/>
                        <Typography color='text.primary' ml='10px' fontSize='1.1rem'> IAmUserFriend</Typography>
                    </div>
                    <Divider/>
                    <div style={{display:'flex',flexDirection:'row',padding:'5px'}}> 
                        <img src={UserImg} style={{width:'25px',borderRadius:'50%',marginLeft:'10px'}}/>
                        <Typography color='text.primary' ml='10px' fontSize='1.1rem'> IAmUserFriend</Typography>
                    </div>
                    <Divider/>
                    <div style={{display:'flex',flexDirection:'row',padding:'5px'}}> 
                        <img src={UserImg} style={{width:'25px',borderRadius:'50%',marginLeft:'10px'}}/>
                        <Typography color='text.primary' ml='10px' fontSize='1.1rem'> IAmUserFriend</Typography>
                    </div>
                    <Divider/>

                </Box>
            </div>
            <div id='big-div'>
                {loggedInuser._id==personProfile._id && <PostForm/>}
                <div style={{marginTop:'10px'}}>
                {/* Posts */}
                <Post/>
                <Post style={{marginTop:'10px'}} />
                </div>
            </div>
        </Box>
    );
}

export default Profile;