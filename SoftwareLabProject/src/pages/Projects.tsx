import React from 'react';
import './../App.css'
import {useNavigate} from 'react-router-dom';
import { Button, Grid, TextField} from '@material-ui/core';
import { string } from 'prop-types';
import { BorderAllOutlined, FirstPage } from '@material-ui/icons';

function Projects(){
    const navigate = useNavigate();
    const username = "PLACEHOLDER"
    const projects = [
        {
            name: 'Project One',
            set_one: 100,
            set_two: 200,

        },
        {
            name: 'Project Two',
            set_one: 150,
            set_two: 300,
        }
    ]
   
    return(
        <div className='App'>
            <div style = {{display:'inline-flex', float:'left', marginLeft:20}}>
                <h1>
                    Welcome {username}
                </h1>
            </div>
            { projects.map(project => <Projectview key={project.name} project={project} />) }
        </div>
    );
}

function Projectview(props: any){
    return(<div>
        <Grid container spacing = {2} justifyContent = "flex-start" style = {{flexDirection:'row', borderBlockStyle: 'solid', height: '160px'}}>
            <Grid item xs = {4} sm = {2} style = {{margin:0}}>
                <h2> {props.project.name}</h2>
            </Grid>
            <Grid item xs = {4} sm = {2} justifyContent = "center" style = {{flexDirection: 'column', padding:'30px'}}>
                <p>HWSET1: {props.project.set_one}</p>
                <p>HWSET2: {props.project.set_two}</p>
            </Grid>
            <Grid item xs = {4} sm = {2}  style = {{padding: 20}}>
                <TextField variant = 'outlined' id = "hardwareset_1"  label = "Enter QTY" type = "number"  margin = "dense" >

                </TextField>
                <TextField variant = 'outlined' id = "hardwareset_2" label = "Enter QTY" type = "number" margin = "dense">

                </TextField>
            </Grid>
            <Grid item xs = {4} sm = {2}  style = {{flexDirection: 'column', padding:20}}>
                <Button variant = "outlined" style = {{margin:10, width: '100%'}}> Check In</Button>
                <Button variant = "outlined" style = {{margin:10, width: '100%'}}> Check In</Button>
            </Grid>
            <Grid item xs = {4} sm = {2} style = {{flexDirection: 'column', padding:20}}>
                <Button variant = "outlined" style = {{margin:10, width: '100%'}}> Check Out</Button>
                <Button variant = "outlined" style = {{margin:10, width: '100%'}}> Check Out</Button>
            </Grid>
            <Grid item xs = {4} sm = {2} justifyContent = "center" alignContent = "center" style = {{flexDirection: 'column', padding:50}}>
                <Button variant = "contained" color = "primary" style = {{height: '40px', width:'100%'}}> LEAVE </Button>
            </Grid>
        </Grid>
    </div>);
}

export default Projects;
