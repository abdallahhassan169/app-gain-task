import React,{useState} from "react";
import axios from 'axios';
import { render } from 'react-dom'
import  { Component } from 'react';
import './css/home.css';
import { NavLink } from 'react-router-dom';

class Home extends Component {
	constructor(props) {
         super(props);
         this.state = {
             links: []
         }
     }

		 componentDidMount() {
	         fetch("http://127.0.0.1:5000/")
	         .then(res => res.json())
	         .then(
	             (results) => {
	                 this.setState({ links: results });
									 console.log(results)
	             },
	             (error) => {
	                 alert(error);
	             }

	         )
	     }
    render() {
        return (
					<div class="container-fluid bg-light pt-5">
					        <div class="container py-5">
					            <div class="row justify-content-center">
					                <div class="col-lg-6 col-md-8 col text-center mb-4">
					                    <h6 class="text-primary font-weight-normal text-uppercase mb-3">Links</h6>
					                    <h1 class="mb-4">Here you can see users' links</h1>
					                </div>
					            </div>
					            <div class="row pb-3">
											{this.state.links.map(link =>
					                <div class="col-md-4 mb-4">
					                    <div class="card border-0 mb-2">
					                        <div class="card-body bg-white p-4">
					                            <div class="d-flex align-items-center mb-3">
					                                <a class="btn btn-primary" >{link.slug} <i class="fa fa-link"></i></a>
																					<h5 class="m-0 ml-3 text-truncate">{link.and_primary}</h5>
																					<h5 class="m-0 ml-3 text-truncate">{link.and_fallback}</h5>

					                            </div>
																			<p><h4>web: </h4>{link.web}</p>
																			<p><h4>android: </h4></p>
																			<p><h6>primary :  <a href={link.android.and_primary}>{link.android.and_primary}</a></h6></p>
																			<p><h6>fallback :  <a href={link.android.and_primary}>{link.android.and_fallback}</a></h6></p>

																			<p><h4>ios: </h4></p>
																			<p><h6>primary :  <a href={link.ios.ios_primary}>{link.ios.ios_primary}</a></h6></p>
																			<p><h6>fallback :  <a href={link.ios.ios_primary}>{link.ios.ios_fallback}</a></h6></p>

																			<NavLink to={`/edit/${link.slug}`} ><button type="submit" >Edit  </button></NavLink>



					                        </div>
					                    </div>
					                </div>)}


					            </div>
					        </div>
					    </div>
        )
    }
}

export default Home;
