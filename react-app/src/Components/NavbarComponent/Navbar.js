<<<<<<< HEAD
import { AppBar, Button, Icon, IconButton, Typography } from "@mui/material";
=======
import { AppBar, Button, IconButton, Typography } from "@mui/material";
>>>>>>> 736f2676be405dbc992e4e79ca6b19dfeb2e342d
import "./Navbar.css";
import OdinbookImg from "../../assets/odinbook-logo-white.png";
import UserImg from "../../assets/User.png";
import useScrollTrigger from "@mui/material/useScrollTrigger";
// import * as React from 'react';
import { useState } from "react";
import { useTheme } from "@emotion/react";
import { cloneElement } from "react";
import Brightness4 from '@mui/icons-material/Brightness4';
import Brightness7 from '@mui/icons-material/Brightness7';
<<<<<<< HEAD
import Logout from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
=======
>>>>>>> 736f2676be405dbc992e4e79ca6b19dfeb2e342d


function ElevationScroll(props){
    const { children } = props;

    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0,
    });
    return cloneElement(children, {
      elevation: trigger ? 4 : 0,
    });
}

function Navbar(props){
    const [state,setState] = useState({theme:'default'});
    var {toggleTheme} =props; 
    var theTheme = useTheme();
<<<<<<< HEAD
    const user = JSON.parse(window.sessionStorage.getItem('user'));
    var navigate = useNavigate();
=======
>>>>>>> 736f2676be405dbc992e4e79ca6b19dfeb2e342d

    const onToggleTheme =async()=>{
        var currentTheme = await toggleTheme();
        await setState({theme:currentTheme});
    }
<<<<<<< HEAD
    const LogOut=async()=>{
        window.sessionStorage.setItem('user',JSON.stringify({}));
        navigate('/LogIn');
    }
=======
>>>>>>> 736f2676be405dbc992e4e79ca6b19dfeb2e342d
    return (
        <ElevationScroll>
        <AppBar color='primary'>
            <div className="flex-container">
                <div style={{flexGrow:'1',textAlign:'left',paddingLeft:'7%',verticalAlign:'center'}}>
                    <img id='odinbook-img' src={OdinbookImg}/>
                </div>
<<<<<<< HEAD
                <div id='buttons'>
                    <img  id='user-img' src={UserImg}/> 
                    <div id='username' style={{color:'white'}}> {user.first_name} </div>
                    <IconButton onClick={onToggleTheme} color='inherit'>
                        {state.theme=='dark'?<Brightness4/>:<Brightness7/>}
                    </IconButton>
                    <IconButton onClick={LogOut}>
                        <Logout htmlColor="white"/>
                    </IconButton>
=======
                <div style={{
                    paddingRight:'7%',display:'flex', flexDirection:'row',alignItems:'center',flexGrow:'0.1'
                    ,justifyContent:'space-evenly'}}>
                    <img  id='user-img' src={UserImg} style={{borderRadius:'50%', width:'35px',backgroundColor:'white'}}/> 
                    <div style={{color:'white'}}> UserName</div>
                    <IconButton onClick={onToggleTheme} color='inherit'>
                        {state.theme=='dark'?<Brightness4/>:<Brightness7/>}
                    </IconButton>
>>>>>>> 736f2676be405dbc992e4e79ca6b19dfeb2e342d
                </div>
            </div>
        </AppBar>
        </ElevationScroll>
    );
}

export default Navbar;