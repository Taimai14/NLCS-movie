import React from 'react'
import './user.scss'
import { useState } from "react";
import axios from 'axios';
import Navbar from '../../components/navbar/Navbar'

export const User = () => {
    const user = JSON.parse(localStorage.getItem("user"));

   const [data,setData] = useState({
    username:'',
    password:'',
  })

    const handleChange = async (e) => {
        e.preventDefault();
        const {username,password} = data;
        try {
            await axios.put(`users/${user._id}`, {username,password },{
                headers:{
                        token: "Bearer "+user.accessToken
                    },
            });
            setData({});
        } catch (err) {}
    };
  return (
      <div className='user'>
        <Navbar/>
        <div className="wrapper">
      <div className="container">
        <form>
          <h1>Change username and password</h1>
          <input
            type="email"
            placeholder="username"
            value={data.username || ''} onChange={(e) => setData({...data,username: e.target.value})}
            />
          <input
            type="password"
            placeholder="Password"
            value={data.password || ''} onChange={(e) => setData({...data,password: e.target.value})}
            />
          <button className="loginButton" onClick={handleChange}>
            Change
          </button>
          
        </form>
      </div>
            </div>
    </div>
  )
}
