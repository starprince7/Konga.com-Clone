import Axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { usePaystackPayment } from 'react-paystack';
import { stateContext } from "../App";
import Naira from 'react-naira'
import './payment.css'



function Payment() {
  const myStateContext = useContext(stateContext);
  const { orderId } = myStateContext.state;
  console.log("response From payment component", orderId);

  const { state } = useContext(stateContext);
  const [order, setOrder] = useState({});
  const {cart} = order



  useEffect(() => {
    console.log("USE EFFECT CALLED!.....");

    Axios.post("http://localhost:5000/payment", {id: orderId})
      .then((res) => {
        console.log("RESPONSE FROM THE NEW FETCH REQUEST...", res);
          const data = res.data;
          console.log('the Res.Data...', data)
          setOrder(data)
      })
      .catch((err) => console.log(err));
  }, []);


  const config = {
    reference:  (new Date()).getTime(),
    email: order.email,
    amount: order.amount,
    publicKey: 'pk_test_8322d4131ae45284c939e1be9a74bde9cbb9fcbd',
  };


  // ...PayStack Call Here!
   // you can call this function anything
  const onSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log(reference);
  };

      // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log('closed')
  }

  const PaystackHookExample = () => {
    const initializePayment = usePaystackPayment(config);
    return (
      <div>
          <button onClick={() => {
              initializePayment(onSuccess, onClose)
          }}>Paystack Hooks Implementation</button>
      </div>
    );
};
  
  
  console.log('The order from state....',order)
  console.log('The order from state....',order.amount)
  console.log('The order from state....',order.cart)
  console.log('The data type ....',typeof cart)

  
  return (
    <div className="payment__back">
        <div className="payment__container">
                <p>Order for: <u>{order.email},</u></p>
                <p>Your Order Refrence: <strong><i>{order._id}</i></strong></p>
                <h3>Amount to be Paid: <Naira>{order.amount}</Naira></h3>
                <p>Order Address: {order.address}</p>
                <p><strong>{order.city}</strong></p>
                <p><strong>PHONE NO. : {order.phone}</strong></p>
            </div>
            <div className="payment__paystack-container">
                <div>
                    <button>Make Payment</button>
                    <PaystackHookExample />
                </div>
            </div>
    </div>
  );
}

export default Payment;
