import './App.css';
import {useState} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInForm from './Components/SignInComponent/SignInForm.js';


var apiDir = 'http://localhost:3000/';

function App() {
  const [state, setState] = useState({data:10});

  const onSubmit =async (e)=>{
    e.preventDefault();

    var response = await fetch(apiDir, {
      method:'POST', headers:{'Content-Type':'application/json'},
      body:JSON.stringify({name:'hello servers'})
    }).catch((err)=>{
      console.log('fetch call failed ' +err);
      return;
    });
    
    response=await response.json();

    console.log(response);
    await setState('form working');
  }

  const TempIndexComponent=()=>{ return <div>you are now viewing the esteemed index page </div>}
  return (
    <div className="center">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <TempIndexComponent/>}/>
          <Route path='/signIn' element={<SignInForm/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
