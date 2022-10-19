import React,{useState} from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { render } from 'react-dom'
import  { Component } from 'react';
import './css/create.css'



const Edit = () => {

  const {slug}=useParams();

  const [web, setWeb] = useState("");
  const [and_fallback, setAndf] = useState("");
  const [and_primary, setAndp] = useState("");
  const [ios_primary, setIosP] = useState("");
  const [ios_fallback, setIosF] = useState("");

  function handleChange(event) {
      console.log(event.target.value);
    }
    const handleSubmit =(e)=>{
      e.preventDefault();

    const headers = {
          'Content-Type': 'multipart/form-data',
        }
            axios.post(("http://127.0.0.1:5000/update"+ '/' + slug),{"web":web,"and_primary":and_primary,"and_fallback":and_fallback,"ios_primary":ios_primary,"ios_fallback":ios_fallback }, {"headers":headers})
            .then((output) => {
              console.log(output);
            })
            .catch((err) => {
              console.log(err);
            });

             alert("Your Link is being created!")
          }

    return (
        <>
        <div>
          <form >

            <label >Web</label>
            <input type="text" onChange={e => setWeb(e.target.value)}   placeholder="Web link.."></input>

            <label >android primary</label>
            <input type="text"  onChange={e => setAndp(e.target.value)}  placeholder="android primary link.."></input>

            <label >android fallback</label>
            <input type="text" onChange={e => setAndf(e.target.value)}  placeholder="android fallback link .."></input>

            <label >ios primary</label>
            <input type="text" onChange={e => setIosP(e.target.value)}  placeholder="ios primary link.."></input>

            <label >ios fallback</label>
            <input type="text" onChange={e => setIosF(e.target.value)}  placeholder="ios fallback link.."></input>


            <button onClick={handleSubmit} type="submit"  value="Submit">Edit </button>
          </form>
        </div>
        </>
    );
}

export default Edit;
