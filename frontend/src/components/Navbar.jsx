import React,{useState} from "react";
import axios from 'axios';
import { render } from 'react-dom'
import  { Component } from 'react';
import './css/navbar.css';
import { NavLink } from 'react-router-dom';

class Navbar extends Component {
    render() {
        return (

<div class="topnav">
<NavLink to="/home" >
<a class="active" >Home</a>

</NavLink>
<NavLink to="/create" >
<a  >Create</a>
</NavLink>
</div>


        )
    }
}

export default Navbar;
