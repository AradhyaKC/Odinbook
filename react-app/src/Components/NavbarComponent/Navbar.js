import { AppBar, Button, IconButton, Typography } from "@mui/material";
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

    const onToggleTheme =async()=>{
        var currentTheme = await toggleTheme();
        await setState({theme:currentTheme});
    }
    return (
        <ElevationScroll>
        <AppBar color='primary'>
            <div className="flex-container">
                <div style={{flexGrow:'1',textAlign:'left',paddingLeft:'7%',verticalAlign:'center'}}>
                    <img id='odinbook-img' src={OdinbookImg}/>
                </div>
                <div style={{
                    paddingRight:'7%',display:'flex', flexDirection:'row',alignItems:'center',flexGrow:'0.1'
                    ,justifyContent:'space-evenly'}}>
                    <img  id='user-img' src={UserImg} style={{borderRadius:'50%', width:'35px',backgroundColor:'white'}}/> 
                    <div style={{color:'white'}}> UserName</div>
                    <IconButton onClick={onToggleTheme} color='inherit'>
                        {state.theme=='dark'?<Brightness4/>:<Brightness7/>}
                    </IconButton>
                </div>
            </div>
        </AppBar>
        </ElevationScroll>
    );
}

export default Navbar;