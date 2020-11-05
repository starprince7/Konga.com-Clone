import React, { useContext } from "react";
import { stateContext } from "../App"
import SumTotal from "./SumTotal";
import { Link, withRouter } from "react-router-dom";
import Naira from "react-naira";
import "./total.css";
import Axios from "axios";



const Total = (props) => {
  const { cart } = props;
  const {dispatch} = useContext(stateContext)



  const subTotal = cart.reduce((acc, elem) => {
    if (elem.quantity >= 0) {
      return acc + elem.price * elem.quantity;
    } else return null;
  }, 0);



  const handleSubmit = async () => {
    dispatch({
      type: 'SET_LOADING',
      payload: true
    })
    console.log(cart, subTotal)
    try {
      const res = await Axios.post("/order", { subTotal, cart });
      const data = res.data
      if (data) {
        console.log('from total comp', data)
        dispatch({
          type: 'SET_ORDER_ID',
          payload: data._id
        })
        dispatch({
          type: 'SET_LOADING',
          payload: false
        })
        props.history.push("/checkout");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="total__body">
      <div className="total bold-x">
        <div className="left">Order Summary</div>
        <div className="right">{cart.length} Item</div>
      </div>
      <div className="total">
        <div className="left not-bold">Subtotal:</div>
        <div className="right">
          <Naira>{subTotal}</Naira>
        </div>
      </div>
      <div className="total">
        <div className="left not-bold has-padding">Delivery Charges:</div>
        <div className="right small">
          Add your Delivery address at checkout to see delivery charges
        </div>
      </div>
      <div className="total bold-x">
        <div className="left">Total</div>
        <div className="right">
          <Naira>{subTotal}</Naira>
        </div>
      </div>
      <h4>Excluding delivery charges</h4>
      <div className="total">
        <div>
          <Link onClick={handleSubmit} to="#">
            Continue to Checkout
          </Link>
        </div>
      </div>
      <div>
        <div className="total small" style={{ fontSize: "11px" }}>
          <span>we accept:</span>
          <span>THESE CARD TYPES</span>
        </div>
        <span style={{ fontSize: "11px", margin: "10px" }} className="small">
          Transcations are 100% Safe and Secure
        </span>
      </div>
    </div>
  );
};

export default withRouter(Total);
