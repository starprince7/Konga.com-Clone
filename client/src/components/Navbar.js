import React, { useContext, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { stateContext } from "../App";
import "./navbar.css";
import kongaDesktop from "../img/konga-desktop.png";
import kongaMobile from "../img/konga-mobile.png";

function Navbar(props) {
  const { cartState } = useContext(stateContext);
  const cart = cartState;

  /*setTimeout(()=> {
        props.history.push('/about')
    },2000)*/

  const toggleMenu = () => {
    const sideBar = document.getElementById('sidebar')

    const down = document.getElementById('down')
    const away = document.getElementById('away')
    const up = document.getElementById('up')
    
    sideBar.classList.toggle('active')

    down.classList.toggle('activate-down')
    away.classList.toggle('acitvate-away') 
    up.classList.toggle('activate-up')

  }



  return (
    <>
      <div className="header">
        <div className="navbar">
          <Link to="/">
            <div className="header__logo">
              <img src={kongaDesktop} alt="mobile logo" />
            </div>
          </Link>
          <ul>
            <li>
              <div className="navbar__links">
                <Link to=""><div>Store</div><div>Locator</div></Link>
              </div>
            </li>
            <li>
              <div style={{textAlign: 'center'}} className="navbar__links">
                <Link to=""><div>Help</div><span>^</span></Link>
              </div>
            </li>
          </ul>
          <div className="navbar__search">
            <input
              type="search"
              placeholder="Search for products, brands and categories..."
            />
            <button className="navbar__search-icon">
            <svg fill="white" height="15" viewBox="0 0 15 15" width="12" xmlns="http://www.w3.org/2000/svg" aria-label="search"  name="search"><path d="M6.222 0C2.8 0 0 2.794 0 6.216s2.8 6.222 6.222 6.222a6.174 6.174 0 0 0 3.538-1.121l3.364 3.357a1.091 1.091 0 0 0 1.555 0 1.095 1.095 0 0 0 0-1.549l-3.363-3.364a6.164 6.164 0 0 0 1.12-3.545C12.437 2.794 9.638 0 6.223 0zm0 2.19a4.007 4.007 0 0 1 4.018 4.026 4.007 4.007 0 0 1-4.018 4.025 4.008 4.008 0 0 1-4.025-4.025A4.008 4.008 0 0 1 6.222 2.19z" fill="#ed017f" fillRule="nonzero"></path></svg>
            </button>
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
                <Link to="/login">
                  <div>Login /</div>
                  <div>Signup</div>
                </Link>
              </div>
            </li>
            <li>
              <div className="navbar__links">
                <Link to="/cart">
                  <div className="cart__container cart">
                    <div className="cart__logo">
                    <svg height="15" viewBox="0 0 17 15" width="12" xmlns="http://www.w3.org/2000/svg" aria-label="cart" name="cart"><path d="M15.814 12.856a2.144 2.144 0 1 0-4.287 0 2.144 2.144 0 0 0 4.287 0zm-2.791 0a.646.646 0 1 1 1.288 0 .646.646 0 0 1-1.286 0h-.002zm2.438-10.143V2.71a1.498 1.498 0 0 1 1.454 1.857l-1.022 4.14a1.872 1.872 0 0 1-1.818 1.424H6.482c-.867 0-1.62-.593-1.822-1.436L3.003 1.784a.374.374 0 0 0-.363-.286H.749A.749.749 0 0 1 .749 0h1.889c.866 0 1.62.594 1.822 1.436l1.656 6.912c.041.168.191.286.364.287h7.595a.374.374 0 0 0 .363-.285l1.023-4.14H9.74a.749.749 0 1 1 0-1.497h5.72zM6.403 15a2.144 2.144 0 1 1 0-4.287 2.144 2.144 0 0 1 0 4.287zm0-2.791v.001a.646.646 0 1 0 0-.002z" fill="#FFF" fillRule="nonzero"></path></svg>
                    </div>
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

            <Link to="#"><strong>All Categories</strong></Link>
            <Link to="#">Computer and Accesories</Link>
            <Link to="#">Phones and Tablets</Link>
            <Link to="#">Electronics</Link>
            <Link to="#">Konga Fashion</Link>
            <Link to="#">Home and Kitchen</Link>
            <Link to="#">Baby, Kids and Toys</Link>
            <Link to="#">Other Categories</Link>

        </div>
      </div>
      {/* ==================================== Mobile Nav Bar OR Header ================================== */}
      <div className="mobile__header">
        <div className="mobile__menu-btn">
          <div onClick={toggleMenu} className="menu">
            <i id="down"></i>
            <i id="away"></i>
            <i id="up"></i>
          </div>
        </div>
        <Link to="/">
        <div className="mobile__logo">
          <img src={kongaMobile} alt="mobile logo" />
        </div>
        </Link>
        {/* ===========My Cart======= */}
        <Link to="/cart">
          <div className="cart__container-mobile">
            <div id="cart__mobile">
            <div className="cart__mobile-logo">
            <svg height="20" viewBox="0 0 17 15" width="22" xmlns="http://www.w3.org/2000/svg" aria-label="cart"  name="cart"><path d="M15.814 12.856a2.144 2.144 0 1 0-4.287 0 2.144 2.144 0 0 0 4.287 0zm-2.791 0a.646.646 0 1 1 1.288 0 .646.646 0 0 1-1.286 0h-.002zm2.438-10.143V2.71a1.498 1.498 0 0 1 1.454 1.857l-1.022 4.14a1.872 1.872 0 0 1-1.818 1.424H6.482c-.867 0-1.62-.593-1.822-1.436L3.003 1.784a.374.374 0 0 0-.363-.286H.749A.749.749 0 0 1 .749 0h1.889c.866 0 1.62.594 1.822 1.436l1.656 6.912c.041.168.191.286.364.287h7.595a.374.374 0 0 0 .363-.285l1.023-4.14H9.74a.749.749 0 1 1 0-1.497h5.72zM6.403 15a2.144 2.144 0 1 1 0-4.287 2.144 2.144 0 0 1 0 4.287zm0-2.791v.001a.646.646 0 1 0 0-.002z" fill="#FFF" fill="#50545b"></path></svg>
            </div>
              {
                // Here, Show The Cart's Count value in a green like background if There are Items in Cart!
                cart.length !== 0 ? (<div id="cart__number">{cart ? cart?.length : 0}</div>) : (null)
              }
            </div>
          </div>
        </Link>
        <div className="mobile__search">
          <input
            type="search"
            placeholder="Search for products, brands and categories..."
          />
        </div>
        <div id="sidebar" className="mobile__sidebar">
          <div className="mobile__action-btn">
            <button>Login</button>
            <button>Signup</button>
          </div>
          <div className="mobile">
            <table cellSpacing="3">
              <tbody>
                <tr>
                  <td>
                    <div className="mobile__links">
                      <div>My Cart</div>
                      <span>{cart ? cart?.length : 0} items in cart</span>
                    </div>
                  </td>
                  <td>
                    <div className="mobile__links">
                      <div>Track Order</div>
                      <span>View order status</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="mobile__links">
                      <div>Sell on</div>
                      <span>Konga</span>
                    </div>
                  </td>
                  <td>
                    <div className="mobile__links">
                      <div>Physical Store</div>
                      <span>Stores around you</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mobile__navigation">
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
      </div>
    </>
  );
}

export default withRouter(Navbar);
