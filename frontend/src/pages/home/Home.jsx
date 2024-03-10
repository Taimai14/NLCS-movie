import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import './home.css'
import Featured from '../../components/featured/Featured'
import List from '../../components/list/List'
import axios from 'axios';

export default function Home({type}) {
  const [lists,setLists] = useState([]);
  const[genre, setGenre] = useState('');

  useEffect(()=>{
    const getRamdomLists = async ()=>{
      try{
        const res = await axios.get(`lists${type ? "?type=" + type : ""}${
            genre ? "&genre=" + genre : ""}`,{
              headers:{
                 token:
              "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken,
              }
            });
        setLists(res.data);
      }catch(err){
        console.log(err)
      }
    };
    getRamdomLists();
  },[type,genre])
    console.log(lists)
  console.log(genre)
  return (
    <div className='home' >
      <Navbar setGenre={setGenre}/>
      <Featured type={type} setGenre={setGenre}/>
      {
      lists.map((list, index) => (
        (list.genre === genre || genre === "" || !list.genre) && (
          <List list={list} key={index} />
        )
      ))
    }
    </div>
  )
}
