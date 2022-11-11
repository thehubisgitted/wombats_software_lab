import { Button, TextField } from '@material-ui/core';
import React from 'react';
import './../App.css'

class HWSet extends React.Component{
    capacity: number;
    availability: number;
    name: string;

    constructor(capacity: number, name: string, props: {} | Readonly<{}>){
        super(props);
        this.capacity = capacity;
        this.availability = capacity;
        this.name = name;
    }

    checkIn(){
        //update from backend
    }

    checkOut(){
        //update from backend
    }

    render(){
        return(
        <div className="flexbox-container">
            <div>{this.name}: {this.availability} / {this.capacity}</div>
            <div><TextField id="HWQty" label="Enter Qty" variant="outlined" /></div>
            <div><Button color = "primary" variant = "contained" onClick={()=> {this.checkIn}}> Check In </Button></div>
            <div><Button color = "primary" variant = "contained" onClick={()=> {this.checkOut}}> Check Out </Button></div>
        </div>
        );
    }
}

export default HWSet;
