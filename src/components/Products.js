import React from "react";
import "./Products.css";
import { stateContext } from "../App";
import ProductBanner from "../img/konga-banner.jpg";
import productImage from "../img/product1.jpg";
import CurrencyFormat from "react-currency-format";

function Products() {
  const { state, cartDispatch } = React.useContext(stateContext);
  const { products } = state;

  const addToCart = (id, title, img, price, quantity) => {
    //alert("ya butn working!");
    cartDispatch({
      type: "ADD_TO_CART",
      payload: { id, title, img, price, quantity },
    });
  };

  return (
    <>
      <div className="product__header">
        <div className="products__left">
          <span>
            Home &gt;
            <strong> Daily Deals</strong>
          </span>
          <h1>Amazing Deals Online</h1>
        </div>
      </div>
      <div className="center">
        <div className="products__banner">
          <img src={ProductBanner} alt="product banner" />
        </div>
        <div className="row">
          {products?.map(({ id, rating, title, img, price, discount, quantity }) => {
            return (
              <div key={id} className="card">
                <div className="products__discount">
                  <span>{discount} OFF</span>
                </div>
                <img src={productImage} alt="productimage" />
                <h3>{title}</h3>
                <div className="products__star">
                  {Array(rating)
                    .fill()
                    .map((_) => (
                      <span>⭐</span>
                    ))}
                </div>
                <div className="products__divider"></div>
                <span>
                  <CurrencyFormat
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
                  />
                </span>
                <div className="products__divider"></div>
                <button onClick={() => addToCart(id, title, img, price, quantity = 1)}>
                  Add To Cart
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Products;
