import Axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { PaystackButton } from "react-paystack";
import { stateContext } from "../App";
import Naira from "react-naira";
import "./payment.css";

function Payment(props) {
  const {state, cartDispatch} = useContext(stateContext);
  const { orderId } = state;

  const [order, setOrder] = useState({});
  const { cart } = order;

  useEffect(() => {
    console.log("USE EFFECT CALLED!.....");

    Axios.post("/payment", { id: orderId })
      .then((res) => {
        const data = res.data;
        console.log("the Res.Data...", data);
        setOrder(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const config = {
    reference: order._id,
    email: order.email,
    amount: order.amount * 100,
    metadata: {
      name: order.name,
      phone: order.phone,
    },
    publicKey: "pk_test_8322d4131ae45284c939e1be9a74bde9cbb9fcbd",
  };

  // ...PayStack Call Here!
  // you can call this function anything
  const handlePaystackSuccessAction = (ref) => {
    // Implementation for whatever you want to do with reference and after success call.

    Axios.get(`/verify-transcation/${ref.reference}`)
      .then((res) => {
        console.log("Success in verfiying Transcation", res);
        cartDispatch({type: "CLEAR_CART"})
        props.history.push("/");
      })
      .catch((error) => console.log(error));
  };

  // you can call this function anything
  const handlePaystackCloseAction = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };

  const componentProps = {
    ...config,
    text: "Make Payment",
    onSuccess: (reference) => handlePaystackSuccessAction(reference),
    onClose: handlePaystackCloseAction,
  };

  return (
    <div className="payment__back">
      <div className="payment__container">
        <h3>Order Details</h3>
        <div className="payment__info">
          <p>Order for:</p>{" "}
          <p className="payment__blue">
            <u>{order.email},</u>
          </p>
        </div>
        <div className="payment__info">
          <p>Your Order Refrence:</p>
          <p>
            <strong>
              <i>{order._id}</i>
            </strong>
          </p>
        </div>
        <div className="payment__info">
          <p>Amount to be Paid:</p>
          <p>
            <strong>
              <Naira>{order.amount ? order.amount : 0}</Naira>
            </strong>
          </p>
        </div>
        <div className="payment__info">
          <p>Order Address:</p>{" "}
          <p className="payment-address">{order.address}</p>
        </div>
        <div className="payment__info">
          <p>State / City:</p>{" "}
          <p>
            <strong>{order.city}</strong>
          </p>
        </div>
        <div className="payment__info">
          <p>PHONE NO.: </p>{" "}
          <p>
            <strong>{order.phone}</strong>
          </p>
        </div>
      </div>
      <div className="payment__paystack-container">
        <div>
          <PaystackButton {...componentProps} />
        </div>
      </div>
    </div>
  );
}

export default Payment;
