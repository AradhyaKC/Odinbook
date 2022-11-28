import './App.css';
import {useState} from 'react';

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

  return (
    <div className="center">
      <div> state value = {state.toString()}</div>
      <form className='center' style={{height:'min-content'}}>
        <label htmlFor='email'> enter email</label>
        <input id='email' name='email' placeholder='enter email here'/>
        <label htmlFor='password'> enter password</label>
        <input id='password' name='password'/>
        <button onClick={onSubmit}> Submit </button>
      </form>
    </div>
  );
}

export default App;
