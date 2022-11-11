import React from 'react';
import './../App.css'
import {useNavigate} from 'react-router-dom';
import { Button } from '@material-ui/core';

function Projects(){
    const navigate = useNavigate();

    return(
        <div className='App'>
            <div> Projects Page</div>
            <div>
                <Button color = "primary" variant = "contained" onClick={()=> {navigate('/')}}> Back to Login </Button>
            </div> 
        </div>
    );
}

export default Projects;
