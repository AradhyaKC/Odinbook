import { useTheme } from '@emotion/react';
import { Divider, Hidden, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import UserImg from "../../assets/User.png";
import {IconButton} from '@mui/material';
import Delete from '@mui/icons-material/Delete';
import ThumbUp from '@mui/icons-material/ThumbUp';
import Comment from '../Comment/Comment';


function Post(props){
    const theme = useTheme();
    const {postObj} =props;
    return (
    <Box  {...props} borderRadius='5px' sx={{backgroundColor:(theme.palette.mode=='light'?'white':'grey.800'),width:'100%',overflow:'hidden'}} >
        <Box sx={{backgroundColor:(theme.palette.mode=='light'?'grey.300':'grey.A700'),display:'flex',flexDirection:'row',padding:'7px',
        alignItems:'center',paddingLeft:'15px'}}>
            <img src={UserImg} style={{width:'35px',height:'35px'}} />
            <div style={{overflow:'hidden',flexGrow:'1',width:'0px',textAlign:'left',}}>
                <Typography fontWeight='500' color='text.primary' fontSize='1.2rem'>ImAmGoodName </Typography>
                <Typography fontSize='0.7rem' ml='5px' color='text.secondary'> posted yesterday at 1:10 PM</Typography>
            </div>
            <div style={{flexGrow:0,textAlign:'right'}}>
                <IconButton > <Delete sx={{color:'error.dark'}} /> </IconButton>
            </div>
        </Box>
        <Divider/>
        <div style={{textOverflow:'wrap'}}>
            <Typography color='text.primary' sx={{textAlign:'left',padding:'7px',paddingLeft:'15px'}}> Im the post description , and iam a very long post descript which will takke you very long</Typography>
        </div>
        <Divider variant='middle'/>
        <Box sx={{textAlign:'right',padding:'5px',paddingRight:'10px'}}>
            {/* when liked color changes to primary.dark and unliked to default(unspecified)  */}
            <Typography fontSize="0.9rem" color='text.secondary'> <IconButton> <ThumbUp sx={{color:'',width:'20px'}}/></IconButton>  1 Like 1 Comment </Typography>
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