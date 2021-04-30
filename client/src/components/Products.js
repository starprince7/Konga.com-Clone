import Axios from "axios";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Naira from "react-naira";
import { stateContext } from "../App";
import "./Products.css";

import ProductBanner from "../img/konga-banner.jpg";
import productImage from "../img/product1.jpg";
import CurrencyFormat from "react-currency-format";

function Products() {
  const { state, dispatch, cartDispatch } = React.useContext(stateContext);
  const { products } = state;

  const addToCart = (id, title, image, price, quantity) => {
    //alert("ya butn working!");
    cartDispatch({
      type: "ADD_TO_CART",
      payload: { id, title, image, price, quantity },
    });
  };

  useEffect(() => {
    dispatch({
      type: "SET_LOADING",
      payload: true,
    });

    Axios.get("https://fakestoreapi.com/products").then((result) => {
      dispatch({
        type: "GET_PRODUCTS",
        payload: result.data,
      });

      dispatch({
        type: "SET_LOADING",
        payload: false,
      });
      // console.table("Result from the get Request", result.data);
    })
    .catch((err) => {
      dispatch({
        type: "SET_LOADING",
        payload: false,
      });
      alert("ERR! Could not fetch Products, please try again!")
    });

    // async function getProducts() {
    //   try {
    //     const response = await Axios.get("https://fakestoreapi.com/products")
    //     if (response) {
    //       dispatch({
    //         type: "GET_PRODUCTS",
    //         payload: response.data,
    //       });
    
    //       dispatch({
    //         type: "SET_LOADING",
    //         payload: false,
    //       });
    //       // console.table("Result from the get Request", response.data);
    //     }
    //    } catch (error) {
    //     console.log(":cannot GET PRODUTS ERR!", error)
    //   }
    // }

    // state.products = [] ?
    //   getProducts() :
    //   dispatch({ type: "SET_LOADING", payload: false });

  }, []);

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
          {products?.map(
            ({ id, rating, title, image, price, discount, quantity }) => {
              return (
                <div key={id} className="card">
                  <div className="products__discount">
                    <span>{Math.floor((3*price)/10000)}% OFF</span>
                  </div>
                  <img src={image} alt="productimage" />
                  <h3>{title}</h3>
                  <div className="products__star">
                    {Array(rating)
                      .fill()
                      .map((_, index) => (
                        <span key={index}>⭐</span>
                      ))}
                  </div>
                  <div className="products__divider"></div>
                  
                  <span>
                    <Naira>{price}</Naira>
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
                  </span>
                  <div className="products__divider"></div>
                  <button
                    onClick={() =>
                      addToCart(id, title, image, price, (quantity = 1))
                    }
                  >
                    Add To Cart
                  </button>
                </div>
              );
            }
          )}
        </div>
      </div>
    </>
  );
}

export default Products;
