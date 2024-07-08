import React,{useState,useEffect, useRef} from 'react';
import { Routes,Route,useNavigate } from 'react-router-dom';

import {client} from '../utils/client';
import {userQuery} from '../utils/data';
import UserProfile from '../components/UserProfile';
import AddProduct from '../components/AddProduct';
import Navbar from '../components/Navbar';
import Products from './Products';
import DashBoard from './DashBoard';
const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();

  const userId = localStorage.getItem('emailId') !== 'undefined' ? JSON.parse(localStorage.getItem('emailId')) : localStorage.clear();
  useEffect(() => {
    const query = `*[_type == "user" && emailId == '${userId}']`;
    client.fetch(query).then((data)=>{
      setUser(data[0]);
    })
  }, []);
  return (
    <>
    <div>
        <Navbar user = {user && user}/>
    </div>
    <div>
        <Routes>
            <Route path='/*' element={<DashBoard user={user && user}/>} />
            <Route path='/products' element={<Products user = {user && user}/>} />
            <Route path='/user_profile/:userId' element={<UserProfile user = {user && user} />} />
            <Route path='/add_product' element={<AddProduct user = {user && user} />} />
        </Routes>
    </div>
    </>

  );
  
}

export default Home