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

    function handleRegistration(){

    }

    function handleChange_password(event:any){

    }

    function handleChange_username(event:any){

    }

    function handleChange_confirm_password(event:any){

    }

    function handleChange_userID(event:any){
        
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
                        label = "Username" 
                        margin = "normal" 
                        fullWidth
                        InputProps={{startAdornment:( <InputAdornment position = "start"><AccountCircle/></InputAdornment>),
                        }}></TextField>
                    </div>
                    <div className="text">
                        <TextField
                        label = "User ID" 
                        margin = "normal" 
                        fullWidth
                        InputProps={{startAdornment:( <InputAdornment position = "start"><AccountCircle/></InputAdornment>),
                        }}></TextField>
                    </div>
                    <div className="text">
                        <TextField 
                        label = "Password" 
                        margin = "normal"
                        type = "password"
                        fullWidth
                        InputProps={{startAdornment:( <InputAdornment position = "start"><LockRounded/></InputAdornment>),
                        }}></TextField>
                    </div>
                    <div className="text">
                        <TextField 
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
                <Grid item> <Button variant = "contained" color = "primary"> Register</Button></Grid>
              </Grid>
                </div>
                </div>
            </div>   
        </div> 
      );       
  }

export default Registration;
