import './App.css';
import {v4 as uuid} from 'uuid'
import {useEffect, useState} from 'react'
import api from'./Postdata'
import axios from 'axios';
import Social from './component/Social';
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
      <Social />
    </div>
  );
}

export default App;
