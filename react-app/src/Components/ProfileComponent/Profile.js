import './Profile.css';
import Box from '@mui/material/Box';
import { useTheme } from '@emotion/react';
import { Button, Divider, IconButton, TextField, Typography } from '@mui/material';
import { dark } from '@mui/material/styles/createPalette';
import UserImg from "../../assets/User.png";
import PostForm from '../PostForm/PostForm.js';
import Post from '../Post/Post.js';
import Check from '@mui/icons-material/Check';
import Close from '@mui/icons-material/Close';
import Edit from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import { useEffect, useRef, useState } from 'react';

//new user fields : description , joinDate , birthDate? , FriendList , PostList ,friendreqList,commentList?, profilePicUrl?

function Profile(props){

    const [editIsOpen,setEditIsOpen] = useState(false);

    var theme = useTheme();
    const loggedInUser= JSON.parse(window.sessionStorage.getItem('user'));
    const personProfile=JSON.parse(window.sessionStorage.getItem('user'));
     
    // const tempPersonProfile=JSON.parse(window.sessionStorage.getItem('user'));// swap it with profile of person
    // var personProfile = {...tempPersonProfile};  
    // personProfile['description']=' this is tmeporary description written to test ui and ajsckajsncknaj aksjncaksnjcksjcnaks akjsnckjansckjancs';
    // personProfile['joinDate']=new Date('Aug 12 2022');
    // personProfile['profilePicUrl']='https://pluspng.com/img-png/user-png-icon-young-user-icon-2400.png';

    const onCloseEdit=()=>{
        setEditIsOpen(false);
    }
    function EditProfileModal(props){
        const {open, handleClose} = props;
        const [displayImageUrl, setDisplayImageUrl] = useState((loggedInUser.profilePicUrl==undefined)?UserImg:loggedInUser.profilePicUrl);
        const imageSelect =useRef(0);
        imageSelect.current=document.getElementById('profilePicUrl');
        

        const onChangeProfilePic =()=>{
            var reader =new FileReader();
            reader.addEventListener('load',()=>{
                const uploaded_image = reader.result;
                // console.log(uploaded_image);
                setDisplayImageUrl(uploaded_image);
            });
            reader.readAsDataURL(imageSelect.current.files[0]);
        }

        return (
        <Dialog open={open} onClose={handleClose} width='700px'>
            <Box sx={{padding:'10px',backgroundColor:(theme.palette.mode=='light'?'white':'background.paper')}}>
                <div>
                    <Typography color='text.primary' fontSize='1.2rem' padding='5px' sx={{textAlign:'center'}}>Edit Your Profile</Typography>
                </div>
                <form id='edit-profile-form' encType='multipart/form-data'>
                    <Box sx={{backgroundColor:(theme.palette.mode=='light'?'grey.300':'grey.800'),margin:'10px',borderRadius:'5px' }}>
                        <div style={{display:'flex',flexDirection:'column',alignItems:'center',overflow:'hidden',marginTop:'10px'}}>
                            <img id='edit-profile-img' src={displayImageUrl} style={{borderRadius:'50%'}}/>
                            <div style={{margin:'10px',display:'flex', flexDirection:'row',flexWrap:'wrap',width:'100%'}}>
                                <TextField label='First Name' defaultValue={loggedInUser.first_name} name='first_name' id='first_name' variant='outlined'
                                margin='dense' sx={{ width:'100px' ,flexGrow:1,margin:'5px'}} />
                                <TextField label='Last Name' defaultValue={loggedInUser.last_name} name='last_name' id='last_name' variant='outlined' 
                                margin='dense' sx={{ width:'100px',flexGrow:1,margin:'5px'}}/>    
                            </div>
                            <TextField label='Description' defaultValue={loggedInUser.description==undefined?'Hello there , I am using Odinbook':loggedInUser.description}
                            name='description' id='description' variant='outlined'  style={{width:'95%'}} margin='dense' minRows='2'/>
                            <TextField label='' sx={{margin:'5px',width:'95%',}} name='profilePicUrl' id='profilePicUrl' type='file' 
                            accept='image/jpeg, image/png, image/jpg' onChange={onChangeProfilePic}/>
                        </div>
                    </Box>
                </form>
            </Box>

        </Dialog>
        );
    }

    return (
        <Box id='profile-flex' >
            <EditProfileModal open={editIsOpen} handleClose={onCloseEdit}/>
            <div id='small-div'>

                {/* PersonInfo */}
                <div style={{display:'flex',flexDirection:'row',alignItems:'center',overflow:'hidden',marginTop:'10px'}}>
                    <img src={(personProfile.profilePicUrl!=undefined)?personProfile.profilePicUrl:UserImg} style={{borderRadius:'50%',width:'100px'}}/>
                    <div>
                        <Typography color='text.primary' style={{fontSize:'1.3rem',fontWeight:'500',overflow:'hidden'}} > {personProfile.first_name +' '+personProfile.last_name} </Typography>
                        <Typography color='text.primary' style={{fontSize:'0.9rem',fontWeight:'400',overflow:'hidden'}}>{personProfile.email}</Typography>
                    </div>
                </div>

                {/* About Me  */}
                <Box mt='10px' sx={{backgroundColor:(theme.palette.mode=='light'?'white':'grey.800'),}} borderRadius='5px' >
                    <Box sx={{backgroundColor:(theme.palette.mode=='light'?'primary.main':'background.paper'),textAlign:'left', borderRadius:'5px 5px 0px 0px'
                    ,display:'flex',flexDirection:'row'}}>
                        <div style={{display:'flex',alignItems:'center'}}>
                            <Typography color='white' ml='7px' style={{fontSize:'1.2rem'}}> About me</Typography> 
                        </div>
                        <div style={{flexGrow:1,textAlign:'right',height:'fit-content'}}>
                            <IconButton onClick={(e)=>{setEditIsOpen(true);}}><Edit sx={{color:'white'}}/></IconButton>
                        </div>
                    </Box>
                    <Typography color='text.primary' padding='5px' sx={{textAlign:'left',paddingLeft:'10px'}}>
                        {(personProfile.description==''||personProfile.description==undefined)?'Hello there , I am using Odinbook':personProfile.description}
                    </Typography>
                    <Divider/>
                    <Box color='text.secondary' style={{textAlign:'left',fontSize:'0.9rem',padding:'3px'}} ml='4px'> 
                        Member since {(personProfile.joinDate==undefined)?'August 2021':
                        personProfile.joinDate.toDateString()}
                    </Box>
                </Box>
                
                {/* Add Friend */}
                {loggedInUser._id!=personProfile._id  && <Box sx={{marginTop:'20px',textAlign:'right',paddingRight:'10px'}}>
                    <Button variant='contained' > Add Friend </Button>
                </Box >}

                {/* Friend Req */}
                <Box sx={{backgroundColor:(theme.palette.mode=='light'?'white':'grey.800')}} mt='20px' borderRadius='5px'>
                    <Box sx={{backgroundColor:(theme.palette.mode=='light'?'primary.main':'background.paper'),padding:'5px',paddingLeft:'0px',
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
                    <Box sx={{backgroundColor:(theme.palette.mode=='light'?'primary.main':'background.paper'),textAlign:'left'
                    ,borderRadius:'5px 5px 0px 0px',padding:'5px',paddingLeft:'0px',}}>
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
                {loggedInUser._id==personProfile._id && <PostForm/>}
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