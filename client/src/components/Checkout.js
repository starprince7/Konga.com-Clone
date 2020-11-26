import Axios from "axios";
import React, { useState, useContext } from "react";
import { stateContext } from "../App";
import "./checkout.css";

function CheckOut(props) {
  const { state, dispatch } = useContext(stateContext);
  const { orderId } = state;

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("")
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const handleFormSubmission = async (e) => {
    e.preventDefault();
    dispatch({
      type: 'SET_LOADING',
      payload: true
    })
    console.log({ email, name, address, phone });
    const res = await Axios.put("/customer-info", {
      orderId,
      email,
      name,
      city,
      address,
      phone,
    });
      if(res) {
        dispatch({
          type: 'SET_LOADING',
          payload: false
        })
        props.history.push("/payment")
    }
  };

  return (
    <div className="checkout__flex-wrapper">
      <form onSubmit={handleFormSubmission} className="checkout__form">
        <h3>{orderId}</h3>
        <div className="float-left"></div>
        <div>
          <label>Email<span>*</span></label>
          <input
            type="email"
            maxLength="45"
            required
            placeholder="Enter Your email..."
            onChange={(e) => setEmail(e.target.value)}
            name="email"
          />
        </div>
        <br></br>
        <label>Name<span>*</span></label>
        <div>
          <input
            type="text"
            required
            placeholder="Enter Your name..."
            onChange={(e) => setName(e.target.value)}
            name="name"
          />
        </div>
        <br></br>
        <label>Delivery Address<span>*</span></label>
        <div>
          <input
            type="text"
            required
            placeholder="Enter Your Address..."
            onChange={(e) => setAddress(e.target.value)}
            name="address"
          />
        </div>
        <br></br>
        <label>State / City<span>*</span></label>
        <div>
          <input
            type="text"
            required
            placeholder="Enter Your City or State..."
            onChange={(e) => setCity(e.target.value)}
            name="address"
          />
        </div>
        <br></br>
        <label>Phone<span>*</span></label>
        <div>
          <input
            type="number"
            required
            placeholder="Enter Your Phone No..."
            onChange={(e) => setPhone(e.target.value)}
            name="phone"
          />
        </div>
        <br></br>
        <button>Submit</button>
        <br></br>
      </form>
    </div>
  );
}

export default CheckOut;
