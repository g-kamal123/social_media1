import React from "react";
import classes from "./styles/Navbar.module.css";

function Navbar() {
  return (
    <div className={classes.navbar}>
      <img
        className={classes.logo}
        src="logo-twitter-icon-symbol-0.png"
        alt=""
        style={{ backgroundColor: "none" }}
      />
      <i className="fa-solid fa-house-chimney"></i>
      <i className="fa-regular fa-user"></i>
      <img
        src="https://icon-library.com/images/twitter-tweet-icon/twitter-tweet-icon-28.jpg"
        alt=""
      />
      <i className={`fa-solid fa-circle-user ${classes.profile}`}></i>
    </div>
  );
}

export default Navbar;
