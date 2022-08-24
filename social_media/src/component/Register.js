import React, { useContext, useEffect, useState } from "react";
import classes from "./styles/LogIn.module.css";
import { Storage } from "./Storage";
import { useNavigate } from "react-router";
function Register() {
  const detail = useContext(Storage);
  const nav = useNavigate();
  const [rgsemail, setRgsEmail] = useState("");
  const [rgspass, setRgsPass] = useState("");
  const [rgscnfpass, setRgsCnfPass] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  useEffect(()=>{
    setError(detail.err)
  },[detail.err])
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
        <p>
          <h2>Create Account</h2>{" "}
          <button onClick={() => nav("/")}>Login</button>
        </p>
        <form
          className={classes.form}
          onSubmit={(event) => {
            event.preventDefault();
            if (rgsemail === "0" || rgspass === "" || rgscnfpass === "") {
              setError("All fiels are mandatory**");
              return;
            }
            if(rgspass!==rgscnfpass){
              setError('password does not match')
              return;
            }
            detail.register(rgsemail, rgspass, rgscnfpass);
            setRgsEmail("");
            setRgsPass("");
            setRgsCnfPass("");
            setSuccess("Registered Succesfully");
          }}
        >
          {error && <span style={{ color: "red" }}>{error}</span>}
          {!error && success && <span style={{ color: "green" }}>{success}</span>}
          <label>Email:</label>
          <input
            onChange={(event) => {
              setRgsEmail(event.target.value);
              setError("");
              setSuccess("");
            }}
            placeholder="username"
            value={rgsemail}
          />
          <label>Password:</label>
          <input
            type="password"
            onChange={(event) => {
              setRgsPass(event.target.value);
              setError("");
              setSuccess("");
            }}
            placeholder="Enter password"
            value={rgspass}
          />
          <label>Confirm Password:</label>
          <input
            type="password"
            onChange={(event) => {
              setRgsCnfPass(event.target.value);
              setError("");
              setSuccess("");
            }}
            placeholder="confirm password"
            value={rgscnfpass}
          />
          <button type="submit">Create Account</button>
        </form>
      </div>
    </div>
  );
}

export default Register;