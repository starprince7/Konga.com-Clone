import React from "react";
import { stateContext } from "../App";
import SumTotal from "./SumTotal";
import productImage from "../img/product2.jpg";
import CurrencyFormat from "react-currency-format";
import Naira from "react-naira";
import "./checkout.css";

function CheckOut() {
  const { cartState, cartDispatch } = React.useContext(stateContext);
  const cart = cartState;

  const removeItem = (id) => {
    cartDispatch({
      type: "REMOVE_FROM_CART",
      payload: id,
    });
  };

  const increamentQuantity = (id) => {
    cartDispatch({
      type: "INCREASE_QUANTITY",
      payload: id,
    });
  };

  const decreamentQuantity = (id) => {
    cartDispatch({
      type: "REDUCE_QUANTITY",
      payload: id,
    });
  };

  const cartList = cart.map(({ id, title, img, price, quantity }) => {
    return (
      <div className="checkout__row" key={id}>
        <div className="checkout__items-details">
          <div className="checkout__image">
            <img src={productImage} alt="checkout-item" />
          </div>
          <div className="checkout__items product__info">
            <h3>{title}</h3>
          </div>
        </div>
        <div className="checkout__amount-quantity">
          <div className="checkout__quantity">
            <span>
              <p>
                <strong>Quantity</strong>
              </p>
            </span>
            {/* <strong>{quantity}</strong> */}
            <span className="checkout__btn-shadow">
              <button
                onClick={() => decreamentQuantity(id)}
                className="checkout__button-minus"
              >
                -
              </button>
              <span className="btn-qty"><strong>{quantity}</strong></span>
              <button
                onClick={() => increamentQuantity(id)}
                className="checkout__button-plus"
              >
                +
              </button>
            </span>
          </div>
          <div className="checkout__amount">
            <span>
              <p>
                <strong>Item Price</strong>
              </p>
            </span>
            <strong>
              <Naira>{quantity >= 0 ? price * quantity : null}</Naira>
              {/* <CurrencyFormat
                renderText={(value) => (
                  <span>
                    <strong> {value} </strong>
                  </span>
                )}
                value={price}
                thousandSeparator={true}
                prefix={"NGN"}
                displayType={"text"}
                decimalScale={2}
              /> */}
            </strong>
          </div>
          <div className="checkout__action">
            <span>
              <p>
                <strong>Action</strong>
              </p>
            </span>
            <p className="action-btn" onClick={() => removeItem(id)}>
              Remove item
            </p>
            <p className="action-btn">Save for Later</p>
          </div>
        </div>
      </div>
    );
  });
  return (
    <>
      <div className="checkout__header">
        <h1>Shopping Cart</h1>
      </div>
      <div className="checkout__subtotal">
        {/* ---------Sum Total Component Nested here!--------- */}
        <SumTotal cart={cart} />
      </div>
      <div className="checkout__back">
        <div>
          <div id="checkout-contain" style={{ width: "100%" }}></div>
          <ul class="checkout__ul">
            <li>Items Details</li>
            <li>Quantity</li>
            <li>Items Price</li>
            <li>Action</li>
          </ul>
          {cart.length !== 0 ? cartList : <p>Your shopping cart is empty!</p>}
        </div>
      </div>
    </>
  );
}

export default CheckOut;
