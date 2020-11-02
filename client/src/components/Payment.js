import Axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { PaystackButton } from "react-paystack";
import { stateContext } from "../App";
import Naira from "react-naira";
import "./payment.css";

function Payment() {
  const myStateContext = useContext(stateContext);
  const { orderId } = myStateContext.state;

  const [order, setOrder] = useState({});
  const { cart } = order;

  useEffect(() => {
    console.log("USE EFFECT CALLED!.....");

    Axios.post("http://localhost:5000/payment", { id: orderId })
      .then((res) => {
        const data = res.data;
        console.log("the Res.Data...", data);
        setOrder(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const config = {
    reference: order._id + new Date().getTime(),
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
   
    Axios.get(`http://localhost:5000/verify-transcation/${ref.reference}`)
      .then(res => console.log('Success in verfiying Transcation', res))
      .catch(error => console.log(error))
    console.log(ref);
    console.log(ref.reference);
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

  console.log("The order from state....", order);
  console.log("The order from state....", order.amount);
  console.log("The order from state....", order.cart);
  console.log("The data type ....", typeof cart);

  return (
    <div className="payment__back">
      <div className="payment__container">
        <p>
          Order for: <u>{order.email},</u>
        </p>
        <p>
          Your Order Refrence:{" "}
          <strong>
            <i>{order._id}</i>
          </strong>
        </p>
        <p>
          <strong>Amount to be Paid: </strong><Naira>{order.amount ? order.amount : 0}</Naira>
        </p>
        <p>Order Address: {order.address}</p>
        <p>
          <strong>{order.city}</strong>
        </p>
        <p>
          <strong>PHONE NO. : {order.phone}</strong>
        </p>
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
