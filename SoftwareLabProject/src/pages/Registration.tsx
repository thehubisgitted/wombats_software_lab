import React from 'react';
import './../App.css'
import {useNavigate} from 'react-router-dom';
import { Grid, TextField, Button, InputAdornment } from '@material-ui/core'
import {AccountCircle, LockRounded} from '@material-ui/icons'

function Registration(){
    const navigate = useNavigate();

    return(
        <div>
            <div className="padding">ALREADY HAVE AN ACCOUNT?</div>
                <div className="cancel">
                    <Button color = "primary" variant = "contained" onClick={()=> {navigate('/')}}> Return to login </Button>
                </div> 
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
                    <div className="text">
                        <Button style = {{minWidth: 250}} color = "primary" variant = "contained">
                            Register
                        </Button>
                    </div>
                </div>
            </div>   
        </div> 
      );       
  }

export default Registration;
