import Axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import {stateContext} from '../App'
import "./login.css";

function Login() {
    const {state, dispatch} = useContext(stateContext)

    // useEffect(() => [
    //     Axios.get('/cookie')
    //         .then(response => {
    //         console.log("Auth response", response.data)
    //     })
    // ], [])
 
  const login_form = async (e) => {
    e.preventDefault();

    const form = document.querySelector(".Login-form");

    const email = form.email.value;
    const password = form.password.value;

    try {
      const result = await Axios.post("/login", { email, password });
      result && console.log("the axios request result", result.data.user);
        result && console.log("the Error axios request result", result.data.error);
        result.data.user
            &&  localStorage.setItem("auth", true)    /* dispatch({ type: 'SET_AUTH', payload: true }) */
        result.data.error
            &&  localStorage.setItem("auth", false)    /* dispatch({ type: 'SET_AUTH', payload: false }) */
    } catch (err) {
      console.log(err);
    }
  };

  const signUp_form = async (e) => {
    e.preventDefault();

    const form = document.querySelector(".signup-form");

    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const result = await Axios.post("/signup", { name, email, password });
      result && console.log("the axios request result", result.data.customer);
      result && console.log("the axios Error request result", result.data.error);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form className="Login-form" onSubmit={login_form}>
        <label htmlFor="name">enter your email</label>
        <input type="text" name="email" id="" />
        <br></br>
        <label htmlFor="password">enter your password</label>
        <input type="password" name="password" id="" />
        <br />
        <button>Submit</button>
      </form>
      <br />

      <h1>Sign up</h1>
      <form className="signup-form" onSubmit={signUp_form}>
        <br />
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="" />
        <br />
        <label htmlFor="name">email</label>
        <input type="text" name="email" id="" />
        <br />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="" />
        <br />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default Login;
