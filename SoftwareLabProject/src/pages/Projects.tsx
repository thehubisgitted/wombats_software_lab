import React from 'react';
import './../App.css'
import {useNavigate, useLocation} from 'react-router-dom';
import { Button, Grid, TextField} from '@material-ui/core';
import { BorderAllOutlined, CompassCalibrationOutlined, FirstPage } from '@material-ui/icons';
import { stringify } from 'querystring';

/**
 * 
 * Projects display page with all project information and functionality
 */
function Projects(){
    const navigate = useNavigate();
    const {state} = useLocation();
    const {ID, USERNAME} = state;
    
    interface project_type{
        name: string;
        hardware: number[];
        capacity: number[];
        ID: number|string;
    }
    const [projects, setProjects] = React.useState<project_type[] | null>([]); //list of projects of type project_type
    const [totalTaken_1, setTotalTaken_1] = React.useState<number>(0); //total number thats taken by all projects
    const [totalTaken_2, setTotalTaken_2] = React.useState<number>(0);

    React.useEffect(() => { //initial render
        console.log("use effect activated")
        function getProjects(ID: any){ //gets list of projects
            if(ID === undefined){
                console.log("NO ID? UNDEFINED");
                return [];
            }
    
            fetch('/getProjects', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({'userID':ID}),
              })
              .then((response) => response.json())
              .then((data)=>{
                console.log(data);
                const list: project_type[] = [];
                //counter for  total hardware used in each set
                let count_hardware_1: number = 0;
                let count_hardware_2: number = 0;
                console.log(` counts ${count_hardware_1} and ${count_hardware_2}`)

                data.forEach((project: project_type) =>{ //maps over every project and then pushes into one list
                    count_hardware_1 += project.hardware[0];
                    console.log(` count 1: ${count_hardware_1}`)
                    count_hardware_2 += project.hardware[1];
                    list.push({'name':project.name,'hardware':project.hardware, 'capacity': project.capacity, 'ID': project.ID})
                })
                console.log(` final counts ${count_hardware_1} and ${count_hardware_2}`)
                //sets total hardware available 
                setTotalTaken_1(count_hardware_1);
                setTotalTaken_2(count_hardware_2);
                console.log(` total taken: ${totalTaken_1} ${totalTaken_2}`);
                setProjects(list);
                
    
              })
              .catch((error)=>{
                if(error.response){
                    console.log(error);
                    console.log(error.response.statuts);
                    console.log(error.response.headers);
                  }
              })
          }

        const projectlist = getProjects(ID);
        console.log(`hello heres data from ${projectlist}`);
        
      }, [ID, totalTaken_1, totalTaken_2]);


      
    return( //dynamic rendering based off of list named 'projects'
        <div className='App'>
            <div style = {{display:'inline-flex', float:'left', marginLeft:20}}>
                {USERNAME === 'dummy' ? <h1>Welcome {ID} !</h1> : <h1>Welcome {USERNAME} !</h1>}
            </div>
            { projects?.map((project: { name: any; }) => <Projectview key={project.name} project={project} total_1 = {[totalTaken_1, setTotalTaken_1]} total_2 = {[totalTaken_2, setTotalTaken_2]}
            user_id = {ID}/>) }
            <div style = {{display:'inline-flex', float:'right', margin:20}}>
                <Button variant = 'contained' color = 'primary' onClick = {()=> navigate('/')}> Sign Out</Button>
            </div>
        </div>
    );
}

/**
 * 
 * @param props 
 * @returns
 * 
 * Individual Project component with any functionality thats project specific
 */
function Projectview(props: any){
    // checked out hardware for hardware 1 and 2
    const [checkedout_hardware_1, setHardware_1] = React.useState(Number(props.project.hardware[0])); 
    const [checkedout_hardware_2, setHardware_2] = React.useState(Number(props.project.hardware[1]));

    
    //keep track of values in textfields
    const [quantity_1, setQuantity_1] = React.useState(0);
    const [quantity_2, setQuantity_2] = React.useState(0);

    const project_ID: string|number = props.project.ID;


    //handle to know which set its referring to
    const handleHardware_1 = (event:any) => {   
        setQuantity_1(event.target.value);
        
    }

    const handleHardware_2 = (event:any) => {
        setQuantity_2(event.target.value);
    }
    

    /**
     * 
     * @param number 
     * @returns 
     * 
     * updates the hardware value after checking in, and all logic
     * will send an alert if check in fails
     */
    const checkin_button = (number: number) => {
        let quantity = 0;
        if(quantity < 0){
            return;
        }
        let used = 0;
        let capacity = 0;
        let individually_used = 0;
        if (number === 1){
            quantity = quantity_1;
            capacity = props.project.capacity[0];
            used = props.total_1[0];
            individually_used = checkedout_hardware_1;
        }
        else{
            quantity = quantity_2;
            capacity = props.project.capacity[1];
            used = props.total_2[0];
            individually_used = checkedout_hardware_2;
        }
        console.log(`available: ${used} quantity: ${quantity} capacity: ${capacity} number: ${number}`);
        if(isNaN(quantity)){
            console.log("not a number");
        }
        else{
            console.log("is a number");
        }

        const amount = Number(used) - Number(quantity);
        console.log(`${amount} and  ${isNaN(amount)}`);
        if((amount > -1) && (quantity <= individually_used)){
            console.log(`api fetched qty: ${quantity} and number: ${number-1}`);
            fetch_hardware_check("checkin", quantity, number-1);
        }
        else{
            console.log('api not fetched');
            alert(`CAN'T CHECK IN ${quantity}!`);
        }
        

        
    }

    /** handles all logic for checkout and will send an alert if checkout fails */
    const checkout_button = (number: number) => {
        let quantity = 0;
        let total_used = 0;
        let individually_used = 0;
        let capacity = 0;
        
        if(quantity < 0){
            return;
        }

        if(number === 1){
            quantity = quantity_1;
            total_used = props.total_1[0];
            individually_used = checkedout_hardware_1;
            capacity = props.project.capacity[0];
        }
        else{
            quantity = quantity_2;
            total_used = props.total_2[0];
            individually_used = checkedout_hardware_2;
            capacity = props.project.capacity[1];
        } 

        console.log(`quantity: ${quantity} available: ${total_used}`);
        if(Number(total_used) + Number(quantity) <= capacity){
            console.log(`api fetched`);
            fetch_hardware_check("checkout", quantity, number-1);
            
        }
        else{
            console.log(`api not fetched`);
            alert(`CAN'T CHECK OUT ${quantity} !`);
        }
        

    }  
    /** api call function thats called whenever hardware value needs to be adjusted */
    function fetch_hardware_check(command: string, quantity: number, number: number){
        const data = {'command': command, 'quantity': quantity, 'project_ID': project_ID, 'number': number}
        fetch('/hardwarecheck', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })
          .then((response) => response.json())
          .then((data) =>{
            console.log(data);

                if(data.confirmation === 'hardware checked-in successfully'){ //checking in
                    console.log("check in");
                    if(number === 0){
                        const displayquantity = Number(checkedout_hardware_1) - Number(quantity);
                        const set = props.total_1[1];
                        set(Number(props.total_1[0]) - Number(quantity));
                        setHardware_1(displayquantity);
                    }
                    else{
                        const displayquantity = Number(checkedout_hardware_2) - Number(quantity);
                        console.log(displayquantity);
                        const set = props.total_2[1];
                        set(Number(props.total_2[0]) - Number(quantity));
                        setHardware_2(displayquantity);
                    }
                }
                else{ //checking out
                    console.log("check out");
                    if(number === 0){
                        const set = props.total_1[1];
                        set(Number(props.total_1[0]) + Number(quantity));

                        setHardware_1(Number(checkedout_hardware_1)+Number(quantity));
                    }
                    else{
                        const set = props.total_2[1];
                        set(Number(props.total_2[0]) + Number(quantity));

                        setHardware_2(Number(checkedout_hardware_2) +Number(quantity));
                    }
                }
          })
          .catch((error) =>{
            if(error.response){
                console.log(error);
                console.log(error.response.statuts);
                console.log(error.response.headers);
              }
          })
    }
    
    /**
     * active on leave button click, a user can leave that specific project
     */
    const leaveProject = () =>{
        const data = {'userID': props.user_id, 'projectID': props.project.ID };
        fetch('/leaveProject', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })
          .then((response) => response.json())
          .then((data) =>{
            if(data['confirmation'] === 'remove attempted'){
                console.log("message recieved");
            }

          }).catch((error) => {
                if(error.response){
                    console.log(error);
                    console.log(error.response.statuts);
                    console.log(error.response.headers);
                }
          })
    }

    //standalone onclick function
    const handleOnClick_Leave = ()=>{
        leaveProject();
    }

    //UI for one project
    return(<div>
        <Grid container spacing = {2} justifyContent = "flex-start" style = {{flexDirection:'row', borderBlockStyle: 'solid', height: '160px'}}>
            <Grid item xs = {4} sm = {2} style = {{margin:0}}>
                <h2> {props.project.name}</h2>
            </Grid>
            <Grid item xs = {4} sm = {2} justifyContent = "center" style = {{flexDirection: 'column', padding:'30px'}}>
                <h3 style = {{'whiteSpace': 'nowrap'}}>HWSET1: {checkedout_hardware_1}/{props.project.capacity[0]}</h3>
                <h3 style = {{'whiteSpace': 'nowrap'}}>HWSET2: {checkedout_hardware_2}/{props.project.capacity[1]}</h3>
            </Grid>
            <Grid item xs = {4} sm = {2}  style = {{padding: 20 }}>
                <TextField  onChange = {handleHardware_1} variant = 'outlined' id = "hardwareset_1"  label = "Enter QTY" type = "number"  margin = "dense" >

                </TextField>
                <TextField onChange={handleHardware_2} variant = 'outlined' id = "hardwareset_2" label = "Enter QTY" type = "number" margin = "dense">

                </TextField>
            </Grid>
            <Grid item xs = {4} sm = {2}  style = {{flexDirection: 'column', padding:20}}>
                <Button onClick = {()=>checkin_button(1)} variant = "outlined" style = {{margin:10, width: '100%'}}> Check In</Button>
                <Button onClick = {()=> checkin_button(2)} variant = "outlined" style = {{margin:10, width: '100%'}}> Check In</Button>
            </Grid>

            <Grid item xs = {4} sm = {2} style = {{flexDirection: 'column', padding:20}}>
                <Button onClick = {()=> checkout_button(1)} variant = "outlined" style = {{margin:10, width: '100%'}}> Check Out</Button>
                <Button onClick = {()=> checkout_button(2)} variant = "outlined" style = {{margin:10, width: '100%'}}> Check Out</Button>
            </Grid>
            <Grid item xs = {4} sm = {2} justifyContent = "center" alignContent = "center" style = {{flexDirection: 'column', padding:50}}>
                <Button onClick={()=>handleOnClick_Leave()}variant = "contained" color = "primary" style = {{height: '40px', width:'100%'}}> LEAVE </Button>
            </Grid>
        </Grid>
    </div>);
}

export default Projects;
