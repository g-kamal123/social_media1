import React, { useContext, useEffect } from "react";
import classes from "./styles/Navbar.module.css";
import { Switch } from '@mui/material'
import { Storage } from "./Storage";
import { Link, useNavigate } from "react-router-dom";
import api from "../Postdata";

function Navbar() {
  const detail = useContext(Storage)
  const nav = useNavigate()
  useEffect(()=>{
    const getdata = async()=>{
      const response = await api.get('/curruser')
      if(response.data.user==="")
    nav('/')
    }
    getdata()
  },[])
  return (
    <div className={classes.nav}>
    <div className={`${classes.navbar} ${detail.mode && classes.mode}`}>
      <img
        className={classes.logo}
        src="logo-twitter-icon-symbol-0.png"
        alt=""
        style={{ backgroundColor: "none" }}
      />
      <i className={`fa-solid fa-house-chimney ${classes.home}`} onClick={()=>nav('/feed')}></i>
      <i className={`fa-regular fa-user ${classes.myprofile}`}  onClick={()=>detail.userprofile()}></i>
      <i class={`fa fa-sign-out ${classes.logout}`} aria-hidden="true"  onClick={()=>detail.logout()}></i>
    </div>
    </div>
  );
}

export default Navbar;
