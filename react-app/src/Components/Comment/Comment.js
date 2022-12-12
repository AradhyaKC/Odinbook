import { useTheme } from "@emotion/react";
import { Divider, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import UserImg from "../../assets/User.png";
import { forwardRef } from "react";
import Delete from "@mui/icons-material/Delete";


function Comment(props){
    const {commentObj} =props;
    const theme = useTheme();
    // const CustomComponent = forwardRef(function CustomComponent(props,ref){
    //     return (
    //     <Box>
    //         <Typography color='text.primary'> First CumtumCompoennt</Typography>
    //     </Box>
    //     );
    // });

    return (
        <Box  {...props} sx={{backgroundColor:(theme.palette.mode=='light'?'white':'grey.800'),padding:'5px',borderRadius:'5px',}}>
            <Box sx={{display:'flex',flexDirection:'row'}}>
                <img src={UserImg} style={{width:'22px',height:'22px'}}/>
                <Typography color='text.primary'> ImAmGoodGuy </Typography>
                <Typography  ml='5px' color='text.secondary' fontSize='0.8rem' sx={{marginTop:'5px'}}> Commented on 3:35 AM</Typography>
                <div style={{flexGrow:1,textAlign:'right'}}>
                    <IconButton> <Delete sx={{color:'error.dark'}}/></IconButton>
                </div>
            </Box>
            <Divider/>
            <Typography mt='2px' ml='5px' color='text.primary' sx={{textAlign:'left'}}> I have a  commensy jsacn aksjcakjcsn kasncakjsncsknjc ansckasjnckasj akjsckajnsc .</Typography>
        </Box>
    );
}

export default Comment;