import React, { useContext, useState } from "react";
import { Storage } from "./Storage";
import classes from "./styles/Trending.module.css";
import api from "../Postdata";
import { Link } from "react-router-dom";


function Trending() {
  const detail = useContext(Storage)
  const [listdata,setListData] = useState([])
  const [flaf,setFlaf] = useState(false)
  const searchProfile =async(val)=>{
    const response = await api.get(`/profile?q=${val}`)
    setListData(response.data)
  }
  return (
    <div className={classes.trend}>
    <div className={classes.trending}>
      <div className={classes.search}>
        <i className="fa-solid fa-magnifying-glass"></i>
        <input placeholder="search" onChange={
          (event)=>{searchProfile(event.target.value)
          if(event.target.value!=='')
          setFlaf(true)
          else setFlaf(false)}}/>
          {flaf &&  <ul className={classes.listprofile}>
          {listdata && listdata.map((item)=>
          <Link to='/feed/User' style={{textDecoration:'none',color:'black'}}>
          <li onClick={()=>{
            detail.searcharray(item)
            setFlaf(false)}}>
            <span>{item.name}</span>
            <i
              className="fa-solid fa-circle-user"
              style={{ color: "#1D9BF0", fontSize: "1rem" }}
            ></i>
          </li></Link>)}
        </ul>}
      </div>
      <div className={classes.trendingNames}>
        <h2>#Trending</h2>
        <ul>
          <li>
            <p>
              {" "}
              <h5>#Entertainment</h5>
              <span>1558 tweets</span>
            </p>
            <img src="https://images.wsj.net/im-597722?width=412" alt="" />
          </li>
          <li>
            <p>
              {" "}
              <h5>#Ukraine</h5>
              <span>1558 tweets</span>
            </p>

            <img src="https://images.wsj.net/im-597722?width=412" alt="" />
          </li>
          <li>
            <p>
              {" "}
              <h5>#Ukraine</h5>
              <span>1558 tweets</span>
            </p>
            <img src="https://images.wsj.net/im-597722?width=412" alt="" />
          </li>
          <li>
            <p>
              {" "}
              <h5>#Ukraine</h5>
              <span>1558 tweets</span>
            </p>
            <img src="https://images.wsj.net/im-597722?width=412" alt="" />
          </li>
        </ul>
      </div>
      <div className={classes.trendingNames}>
        <h2>Who to Follow?</h2>
        <ul>
          <li>
            <i
              className="fa-solid fa-circle-user"
              style={{ fontSize: "3rem" }}
            ></i>
            <h5>Name</h5>
            <button>Follow</button>
          </li>
          <li>
            <i
              className="fa-solid fa-circle-user"
              style={{ fontSize: "3rem" }}
            ></i>
            <h5>Name</h5>
            <button>Follow</button>
          </li>
          <li>
            <i
              className="fa-solid fa-circle-user"
              style={{ fontSize: "3rem" }}
            ></i>
            <h5>Name</h5>
            <button>Follow</button>
          </li>
        </ul>
      </div>
    </div>
    </div>
  );
}

export default Trending;
