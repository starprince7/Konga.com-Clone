import React, { useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import { stateContext } from "../App";
import "./navbar.css";

function Navbar(props) {
  const { cartState } = useContext(stateContext);
  const cart = cartState;

  /*setTimeout(()=> {
        props.history.push('/about')
    },2000)*/

  return (
    <div className="header">
      <div className="navbar">
        <ul>
          <li>
            <div className="navbar__links">
              <Link to="">Products1</Link>
            </div>
          </li>
          <li>
            <div className="navbar__links">
              <Link to="">Products1</Link>
            </div>
          </li>
        </ul>
        <div className="navbar__search">
          <input
            type="search"
            placeholder="Search for products, brands and categories..."
          />
        </div>
        <ul>
          <li>
            <div className="navbar__links link-info">
              <Link to="/contact">
                <div>Sell on</div>
                <div>Konga</div>
              </Link>
            </div>
          </li>
          <li>
            <div className="navbar__links login">
              <Link to="/contact">
                <div>Login /</div>
                <div>Signup</div>
              </Link>
            </div>
          </li>
          <li>
            <div className="navbar__links">
              <Link to="/checkout">
                <div className="cart__container cart">
                  <div className="cart__greenbox">
                    <span>My</span>
                    <br></br>
                    <span>Cart</span>
                  </div>
                  <div className="cart__greenbox">
                    <div>{cart ? cart?.length : 0}</div>
                  </div>
                </div>
              </Link>
            </div>
          </li>
        </ul>
      </div>
      <div className="navbar__navigation">
        <ul>
          <li>All Categories</li>
          <li>Computer and Accesories</li>
          <li>Phones and Tablets</li>
          <li>Electronics</li>
          <li>Konga Fashion</li>
          <li>Home and Kitchen</li>
        </ul>
      </div>
    </div>
  );
}

export default withRouter(Navbar);
