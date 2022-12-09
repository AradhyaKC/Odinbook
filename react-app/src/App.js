import './App.css';
import {useState} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInForm from './Components/SignInComponent/SignInForm.js';
import Navbar from './Components/NavbarComponent/Navbar.js';
import { ThemeProvider, createTheme,Button} from '@mui/material';

function App() {
  
  const darkTheme = createTheme({
    palette: {
      mode:'dark'
      // primary: {
        //   main:'#272727',
        // },
      },
  });
  const defaultTheme=createTheme({});
  
  const [state, setState] = useState({theme:'default'});
    
  const ToggleTheme = async ()=>{
    await setState((prevState)=>{
      var newState= {...prevState};
      if(prevState.theme=='default')
        newState.theme='dark';
      else newState.theme='default';
      return newState;
    });
    return state.theme;
  }
  

  const TempIndexComponent=()=>{ return <div>you are now viewing the esteemed index page </div>}
  return (
    <div className="center">
      <ThemeProvider theme={state.theme=='default'?defaultTheme:darkTheme}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={ <TempIndexComponent/>}/>
            <Route path='/LogIn' element={<SignInForm/>}/>
            <Route path='/NavbarTest' element={<Navbar toggleTheme={ToggleTheme}/>}/>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
