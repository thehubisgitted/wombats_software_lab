import React from 'react';
import { Grid, TextField, Button, InputAdornment} from '@material-ui/core'
import './../App.css';
import 'normalize.css';
import {AccountCircle, LockRounded} from '@material-ui/icons'
import {useNavigate} from 'react-router-dom';


function Login() {
    const [userID, setuserID] = React.useState("");
    const [pass, setpass] = React.useState("");
    const [error, seterror] = React.useState(false);
    const [status, setStatus] = React.useState("");
    const [username, setUsername] = React.useState("dummy");
  
    function handleChange_user(event:any){
      setuserID(event.target.value);
      
    }
    function handleChange_pass(event:any){
      setpass(event.target.value);
    }

    function getUsername(){

      const ID_JSON = {'userID': userID};
      console.log(ID_JSON);

      fetch('/getUsername', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ID_JSON),
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data + " here is what the data is");
        const answer = data['username'];
        console.log(answer);

        setUsername(answer);

      })
      .catch((error) => {
        if(error.response){
          console.log(error);
          console.log(error.response.statuts);
          console.log(error.response.headers);
        }

      })

    }
  
    function handleLogin(){
        getUsername();
        const data = {'userID':userID, 'password':pass};
        console.log(data);
        
  
      fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data['confirmation']);
        if(data['confirmation'] === 'User Doesn\'t Exist'){
          seterror(true);
          setStatus("Error: User Doesn't Exist");
        }
        else if(data['confirmation'] === 'Password is Incorrect'){
          seterror(true);
          setStatus("Error: Password is Incorrrect");
        }
        else{
          seterror(true);
          

          setStatus("Login Successful! loading...");
         
          Projects_REDIRECT();
        }
      }).catch((error) => {
        if(error.response){
          console.log(error);
          console.log(error.response.statuts);
          console.log(error.response.headers);
        }
      })
    }
  
    const navigate = useNavigate();
  
    function Registration_REDIRECT(){
      navigate('/register');
    }
    
    /*
      added temporary redirect so michael can work on projects page
    */
    function Projects_REDIRECT(){
      navigate('/projects', {state:{ID: userID, USERNAME: username}});
    }
  
    return (
      <div className='App'>
        <Grid container style = {{minHeight: '100vh'}}>
          <Grid item xs = {12} sm = {6}>
            <img src="wombat.co.png"
             style = {{width: '100%', height: '100%', objectFit: 'cover'}}
              alt = "brand"
              />
          </Grid>
          <Grid container item xs = {12} sm = {6} 
          alignItems = "center" direction = "column" justifyContent = "space-between"
          style = {{padding: 10, marginBottom: 20, paddingBottom: 50}}>
            <div />
              <div style={{display:'flex', flexDirection: 'column', maxWidth: 400, minWidth:300}}>
                <Grid container justifyContent = "center">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/8/8d/Texas_Longhorns_logo.svg" alt = "brand icon" width = {200}></img>
                </Grid>
                <TextField
                onChange = {handleChange_user}
                label = "User ID" 
                margin = "normal" 
                InputProps={{startAdornment:( <InputAdornment position = "start"><AccountCircle/></InputAdornment>),
                }}></TextField>
                <TextField 
                onChange = {handleChange_pass}
                label = "Password" 
                margin = "normal" 
                type = "password"
                InputProps={{startAdornment:( <InputAdornment position = "start"><LockRounded/></InputAdornment>),
                }}></TextField>
                <div style={{ height: 20}}/>
                <Button color = "primary" variant = "contained" onClick={handleLogin}>
                  Login
                </Button>

                { error === true &&
                  <div className = 'error' style = {{paddingTop: 15}}>{status}</div>
                }

                <div style = {{paddingTop: 20}}>
                <Grid container justifyContent='center' spacing = {2}>
                <Grid item>
                  <Button variant = "outlined" color = "primary"> Forgot Password?</Button>
                </Grid>
              </Grid>
                </div>
                <div style={{ height: 20, flexDirection: "row"}}/>
                <Button onClick={()=>Registration_REDIRECT()}>Don't have an account? Sign Up Here</Button>
              </div>
          </Grid>
        </Grid>
      </div>
    );
  }

  export default Login;
  