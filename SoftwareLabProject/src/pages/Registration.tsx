import React from 'react';
import './../App.css'
import {useNavigate} from 'react-router-dom';
import { Grid, TextField, Button, InputAdornment } from '@material-ui/core'
import {AccountCircle, LockRounded} from '@material-ui/icons'

function Registration(){
    const navigate = useNavigate();

    const[username,setUsername] = React.useState("");
    const[password,setPassword] = React.useState("");
    const[userID, setuserID] = React.useState("");
    const[confirmPassword, setConfirmPassword] = React.useState("");

    const [error, setError] = React.useState(false);
    const [status, setStatus] = React.useState("User Created Successfully!");

    function handleRegistration(){
        const data = {'username':username, 'userID':userID, 'password':password, 'confirmPassword':confirmPassword};
        console.log(data);

        fetch('/registration', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })
          .then((response) => response.json())
          .then((data) =>{
            console.log(data['confirmation']);

            if(data['confirmation'] === 'WRONG_PASSWORD'){
                setError(true);
                setStatus("Passwords Don't Match")
            }
            else if(data['confirmation'] === 'USER_EXISTS'){
                setError(true);
                setStatus("Account Exists");
            }
            else if(data['confirmation'] === 'BLANK'){
                setError(true);
                setStatus("Make Sure All Fields Are Filled!");
            }
            else if(data['confirmation'] === 'USER_CREATION_FAILED'){
                setError(true);
                setStatus("DATABASE_ERROR: User Creation Failed");
            }
            else{
                navigate('/projects');
            }

          }).catch((error) => {
                if(error.response){
                    console.log(error);
                    console.log(error.response.statuts);
                    console.log(error.response.headers);
                }
          })
    }

    function handleChange_password(event:any){
        setPassword(event.target.value);
    }

    function handleChange_username(event:any){
        setUsername(event.target.value);
    }

    function handleChange_confirm_password(event:any){
        setConfirmPassword(event.target.value);
    }

    function handleChange_userID(event:any){
        setuserID(event.target.value);
    }


    return(
        <div>
            
            <div className="form">
                <div className="form-body">
                    <Grid container justifyContent = "center">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/8/8d/Texas_Longhorns_logo.svg" alt = "brand icon" width = {200}></img>
                    </Grid>
                    <div className="text">
                        <TextField
                        onChange={handleChange_username}
                        label = "Username" 
                        margin = "normal" 
                        fullWidth
                        InputProps={{startAdornment:( <InputAdornment position = "start"><AccountCircle/></InputAdornment>),
                        }}></TextField>
                    </div>
                    <div className="text">
                        <TextField
                        onChange={handleChange_userID}
                        label = "User ID" 
                        margin = "normal" 
                        fullWidth
                        InputProps={{startAdornment:( <InputAdornment position = "start"><AccountCircle/></InputAdornment>),
                        }}></TextField>
                    </div>
                    <div className="text">
                        <TextField 
                        onChange = {handleChange_password} 
                        label = "Password" 
                        margin = "normal"
                        type = "password"
                        fullWidth
                        InputProps={{startAdornment:( <InputAdornment position = "start"><LockRounded/></InputAdornment>),
                        }}></TextField>
                    </div>
                    <div className="text">
                        <TextField 
                        onChange = {handleChange_confirm_password}
                        label = "Confirm Password" 
                        margin = "normal" 
                        type = "password"
                        fullWidth
                        InputProps={{startAdornment:( <InputAdornment position = "start"><LockRounded/></InputAdornment>),
                        }}></TextField>
                    </div>
                    <div style = {{paddingTop: 20}}>
                <Grid container justifyContent='center' spacing = {2}>
                <Grid item>
                  <Button variant = "contained" color = "primary" onClick={()=> navigate('/')}> Cancel</Button>
                </Grid>
                <Grid item> <Button variant = "contained" color = "primary" onClick={handleRegistration}> Register</Button></Grid>
              </Grid>
              { error === true &&
                  <div className = 'error' style = {{paddingTop: 15}}>{status}</div> 
                }
                </div>
                </div>
            </div>   
        </div> 
      );       
  }

export default Registration;
