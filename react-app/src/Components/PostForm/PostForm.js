import { useTheme } from "@emotion/react";
import { Button, Typography } from "@mui/material";
import Box from '@mui/material/Box';

function PostForm(props){
    const theme = useTheme();
    return (
        <Box style={{position:'relative'}}
        sx={{backgroundColor:(theme.palette.mode=='light'?'white':'grey.800'),overflow:'hidden',height:'100px',textAlign:'left', padding:'10px'}} borderRadius='5px'>
            <Typography color='text.secondary'> What's on your mind?</Typography>
            <Button style={{position:'absolute', bottom:'10px',right:'10px'}} variant='contained'>Post</Button>
        </Box>
    );
}

export default PostForm;