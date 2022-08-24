import './App.css';
import {v4 as uuid} from 'uuid'
import {useEffect, useState} from 'react'
import api from'./Postdata'
import axios from 'axios';
import Social from './component/Social';
import { Route, Routes } from 'react-router-dom';
import FeedDeatail from './component/FeedDeatail';
import LogIn from './component/Login';
import Register from './component/Register';
import Feeds from './component/Feeds';
import User from './component/User';
function App() {
  // const [data,setData] = useState()
  // useEffect(()=>{
  //   const getData =async()=>{
  //   const response = await api.get('/posts')
  //   setData(response.data)
  //   }
  //   getData()
  // },[])
  // console.log(data)
  return (
    <div className="App">
      {/* {uuid()} */}
      <Routes>
        <Route path='/' element={<LogIn />} />
        <Route path='/register' element={<Register />} />
        <Route path='/feed' element={<Social />}>
        <Route path="/feed/feeds" element={<Feeds />} />
          <Route path="/feed/FeedDetails" element={<FeedDeatail />} />
          <Route path="/feed/User" element={<User/>} />
        </Route>
      </Routes>
      {/* <Social /> */}
    </div>
  );
}

export default App;
