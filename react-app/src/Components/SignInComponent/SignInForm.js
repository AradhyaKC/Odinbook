import './SignInForm.css';
import odinbookImg from '../../assets/odinbook-logo-blue.png';
import MyButton from '../../assetComponents/MyButton';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import { useState } from 'react';
import {Button } from '@mui/material';

function SignInForm(props){

    const LogIn=async ()=>{
        console.log('working');
    }

    
    const [signInIsOpen,setSignInIsOpen] = useState(false);
    function SignInModal(props){
        const {open, handleClose} = props;
        const [errorState,setErrorState] = useState([]);

        const SignIn=async(e)=>{
            e.preventDefault();
            var formData = new FormData(document.getElementById('signInForm'));
            var formObj ={};
            for(const [key,value] of formData){
                formObj[key]=value;
            }
            var response = await fetch('http://localhost:3000/users',{
                method:'POST', headers:new Headers({'Content-Type':'application/json'}),
                body:JSON.stringify(formObj),
            });
            response= await response.json();
            if(response.errors!=undefined && response.errors.length!=0){
                var errorFormObject={};
                for(var [key,value] of formData){
                    errorFormObject[key]='';
                    if(response.errors.find((element)=>{return element.param==key;})){
                        errorFormObject[key] = response.errors.findIndex((element)=>{return element.param==key});
                        errorFormObject[key] = response.errors[errorFormObject[key]].msg;
                    }
                }
                setErrorState(errorFormObject);
            }else {
                handleClose();
            }
        }
        const findIfErrorForInput=(elementName)=>{
            if(errorState[elementName]=='' || errorState[elementName]==undefined) return false;
            else return true;
        }

        return (
        <Dialog open={open} onClose={handleClose}>
            <div style={{padding:'15px', textAlign:'center'}}>
                <div style={{fontSize:'1.7rem', fontWeight:'600',color:'#247cf0'}}> Sign Up </div>
                <div> it's quick and easy</div>
                <Divider style={{marginTop:'3px',marginBottom:'3px'}}/>
                <form id='signInForm' className='sign-in-form'>
                    <div style={{display:'flex', flexDirection:'row',justifyContent:'space-evenly'}}>
                        <TextField required error={findIfErrorForInput('first_name')} helperText={errorState['first_name']}
                            name='first_name' style={{width:'200px',paddingRight:'5px'}} variant='outlined' label='First Name' id='first_name' margin='dense'/>
                        <TextField required error={findIfErrorForInput('last_name')} helperText={errorState['last_name']}
                        name='last_name' style={{width:'200px',paddingLeft:'5px'}} variant='outlined' label='Last Name' id='last_name' margin='dense'/>
                    </div>
                    <TextField required error={findIfErrorForInput('email')} helperText={errorState['email']}
                    name='email' style={{width:'100%'}} variant='outlined' label='Email' id='email' margin='dense'/>
                    <TextField required error={findIfErrorForInput('password')} helperText={errorState['password']}
                    name='password' style={{width:'100%'}} type='password' variant='outlined' label='password' id='password' margin='dense'/>
                    <Button style={{marginTop:'10px',width:'40%',textAlign:'center', position:'relative',
                        left:'50%',transform:'translate(-50%,0%)'}} variant='contained' onClick={SignIn}>Sign-Up
                    </Button>
                </form>
            </div>
        </Dialog>
        );
    }
    const onCloseModal =()=>{
        setSignInIsOpen(false);
    }

    return (
        <div className='flex-container'>
            <SignInModal open={signInIsOpen} handleClose={onCloseModal}/>
            <div className='heading'>
                <img src={odinbookImg} width="200px" height="50px"/>
                <div> Connect with friends and the world around you on Odinbook. </div>
            </div>
            <form className='my-form'>
                <label className='form-label' htmlFor='email'> Enter your e-mail</label>
                <input className='form-input' id='email' name='email' placeholder='enter email here'/>
                <label className='form-label' htmlFor='password'> Enter password</label>
                <input className='form-input' id='password' name='password' placeholder='password'/>
                <MyButton onClick={LogIn}> Log In </MyButton>
                <MyButton onClick={(e)=>{ e.preventDefault();setSignInIsOpen(!signInIsOpen);}}
                 style={{backgroundColor:'rgb(72, 182, 54)'}}> Create an account </MyButton>
                <MyButton style={{backgroundColor:'orange'}}> Test drive an existing account </MyButton>
                <MyButton style={{backgroundColor:'blue'}}>  Log in with Fb</MyButton>
            </form>
        </div>
    );
}

export default SignInForm;