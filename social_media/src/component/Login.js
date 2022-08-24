import React, { useContext, useEffect, useState } from "react";
import classes from "./styles/LogIn.module.css";
import { Storage } from "./Storage";
import { Link } from "react-router-dom";
function LogIn() {
  const detail = useContext(Storage);
  const [loginuser, setLoginUser] = useState("");
  const [loginpass, setLoginPass] = useState("");
  const [error,setError] = useState('')
  useEffect(()=>{
    setError(detail.err1)
  },[detail.err1])
  return (
    <div className={classes.login}>
      <div>
        <img
          className={classes.image}
          src="https://media.istockphoto.com/photos/human-figure-icon-graphic-as-user-login-button-on-white-keyboard-picture-id1226883131?b=1&k=20&m=1226883131&s=170667a&w=0&h=FMYb1DFOYbcb2vmbzZhq71k-4cuarJ1U4xCBWjGnze8="
          alt=""
        />
      </div>
      <div className={classes.content}>
        <div className={classes.loginlogo}>
          <span>SIGN In</span>
          {/* <FontAwesomeIcon icon={faLock} className={classes.lock} /> */}
        </div>
        <form
          className={classes.form}
          onSubmit={(event) => {
            event.preventDefault();
            if (loginuser === "" || loginpass === "") {
              setError("enter both email and password");
              return;
            }
            detail.aboutUser(loginuser, loginpass);
            setLoginUser("");
            setLoginPass("");
          }}
        >
          {error && <span style={{color:'red'}}>{error}</span>}
          {detail.error && <span style={{color:'red'}}>{detail.error}</span>}
          <label>Email:</label>
          <input
            onChange={(event) => {setLoginUser(event.target.value)
            setError('')}}
            value={loginuser}
            placeholder='username'/>
          <label>Password:</label>
          <input
            type="password"
            onChange={(event) => {setLoginPass(event.target.value)
          setError('')}}
            value={loginpass}
            placeholder='Enter password'/>
          <button type="submit">SIGN IN</button>
        </form>
        <p style={{ margin: 0 }}>
          Not a User?<Link to="/register">Create New Account</Link>
        </p>
      </div>
    </div>
  );
}

export default LogIn;