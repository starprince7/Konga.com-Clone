import React from "react";
import { stateContext } from "../App";
import SumTotal from "./SumTotal";
// import productImage from "../img/product2.jpg";
// import CurrencyFormat from "react-currency-format";
import Naira from "react-naira";
import "./cart.css";
import Total from "./Total";

function Cart() {
  const { cartState, cartDispatch } = React.useContext(stateContext);
  const cart = cartState;

  const removeItem = (id) => {
    console.log("id from removed item", id);
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

  

  const cartList = cart.map(({ id, title, image, price, quantity }) => {
    return (
      <div className="cart__row" key={id}>
        <div className="cart__items-details">
          <div className="cart__image-title">
            <img src={image} alt="cart-item" />
            <span>
              {" "}
              <h3>{title}</h3>
            </span>
          </div>
        </div>
        <div className="cart__amount-quantity">
          {/* cart__Amount -Qty above ^ Holds-> (Quantity, ItemPrice, and the Action Tab in the cart) */}
          <div className="cart__quantity-amount">
            {/* <strong>{quantity}</strong> */}
            <div>
              <p>
                <span>
                  <strong className="qty">Quantity</strong>
                </span>
              </p>
              <span className="cart__btn-shadow">
                <button
                  style={{ borderRadius: "4px 0 0 4px" }}
                  onClick={() => decreamentQuantity(id)}
                  className="cart__button-minus"
                >
                  -
                </button>
                <button
                  style={{ color: "black" }}
                  className="cart__button-plus btn-qty"
                >
                  <strong>{quantity}</strong>
                </button>
                <button
                  style={{ borderRadius: "0 4px 4px 0" }}
                  onClick={() => increamentQuantity(id)}
                  className="cart__button-plus"
                >
                  +
                </button>
              </span>
            </div>
            <div className="cart__amount">
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
          </div>

          <div className="cart__action">
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
    <div>
      <div className="cart__header">
        <div className="products__left margin">
          <span>
            Home &gt;
            <strong> Shopping Cart</strong>
          </span>
        </div>
        <h1>Shopping Cart</h1>
      </div>

      <div className="cart__subtotal">
        {/* ---------Sum Total Component Nested here! And the cart is passed to it--------- */}
        <SumTotal cart={cart} />
      </div>
      <div className="cart__back">
        <div>
          <div id="cart__cartlist-container">
            <div>
              {cart.length !== 0 ? (
                cartList
              ) : (
                <div className="cart__cart-empty-message">
                  <div className="">
                    <div className="cart__cart-logo">
                      <svg
                        height="58"
                        width="60"
                        aria-label="empty-cart"
                        class=""
                        name="empty-cart"
                      >
                        <g fill="none">
                          <path
                            d="M46.85 58a6.26 6.26 0 0 1-6.26-6.26 6.26 6.26 0 0 1 6.26-6.25 6.26 6.26 0 0 1 6.26 6.25A6.26 6.26 0 0 1 46.85 58zm0-10.01a3.76 3.76 0 0 0-3.75 3.75 3.76 3.76 0 0 0 3.75 3.76 3.76 3.76 0 0 0 3.76-3.76A3.76 3.76 0 0 0 46.85 48zM21.82 58a6.26 6.26 0 0 1-6.26-6.26 6.26 6.26 0 0 1 6.26-6.25 6.26 6.26 0 0 1 6.26 6.25A6.26 6.26 0 0 1 21.82 58zm0-10.01a3.76 3.76 0 0 0-3.75 3.75 3.76 3.76 0 0 0 3.75 3.76 3.76 3.76 0 0 0 3.75-3.76A3.76 3.76 0 0 0 21.82 48zm30.04-5H22.97a8.79 8.79 0 0 1-8.6-7.05l-6.1-30.5H1.8a1.25 1.25 0 0 1 0-2.5H9.3c.6 0 1.11.42 1.23 1l6.3 31.51a6.27 6.27 0 0 0 6.14 5.03h28.89a1.25 1.25 0 0 1 0 2.5z"
                            fill="#ed017f"
                          ></path>
                          <path
                            d="M17.25 37.86a1.25 1.25 0 0 1-1.24-1.08 1.25 1.25 0 0 1 1.08-1.4l36.7-4.9 3.54-19.53a1.24 1.24 0 0 1 1.52-.91c.67.16 1.08.84.91 1.51l-3.74 20.36c-.13.5-.54.87-1.05.94l-37.55 5-.17.01zm3.06-24.9h-8.5a1.25 1.25 0 0 1-1.26-1.26c0-.69.56-1.25 1.25-1.25h8.5a1.25 1.25 0 0 1 0 2.5z"
                            fill="#ed017f"
                          ></path>
                          <path
                            d="M57.78 12.5h-8.53a1.25 1.25 0 0 1 0-2.5h8.53a1.25 1.25 0 0 1 0 2.5z"
                            fill="#ed017f"
                          ></path>
                          <g fill="#FAB8DB">
                            <path d="M34.37 19.77A10 10 0 0 1 24.3 9.88 10 10 0 0 1 34.37 0a10 10 0 0 1 10.08 9.88 10 10 0 0 1-10.08 9.88zm0-17.3a7.5 7.5 0 0 0-7.56 7.41 7.5 7.5 0 0 0 7.56 7.41 7.5 7.5 0 0 0 7.56-7.4 7.5 7.5 0 0 0-7.56-7.42z"></path>
                            <path
                              d="M34.24 10.88l-2.34 2.33a.72.72 0 0 1-1 0 .7.7 0 0 1 0-1l2.34-2.33-2.34-2.32a.7.7 0 0 1 0-1 .71.71 0 0 1 1 0l2.34 2.32 2.34-2.32a.71.71 0 0 1 1 0 .7.7 0 0 1 0 1l-2.33 2.32 2.34 2.33a.7.7 0 0 1-.5 1.2.72.72 0 0 1-.5-.2l-2.35-2.33z"
                              stroke="#FAB8DB"
                            ></path>
                          </g>
                        </g>
                      </svg>
                    </div>
                    <p>Your cart is empty.</p>
                    <span>You have not added any item to your cart</span>
                  </div>
                </div>
              )}
            </div>
            <div className="cart__total-component">
              {cart.length !== 0 ? <Total cart={cart} /> : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
