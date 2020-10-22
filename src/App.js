import React, { useReducer, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Products from "./components/Products";
import CheckOut from "./components/CheckOut";
import Contact from "./components/Contact";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import { reducer, initState } from "./reducer/contextReducer";
import { cartReducer, initCart } from "./reducer/cartReducer";

export const stateContext = React.createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initState);

  const [cartState, cartDispatch] = useReducer(cartReducer, initCart, () => {
    const cartLocalStorage = localStorage.getItem('cart');
    return cartLocalStorage ? JSON.parse(cartLocalStorage) : initCart
  });
  
  const cart = cartState

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  return (
    <stateContext.Provider value={{ state, dispatch, cartState, cartDispatch }}>
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/">
              <Products />
            </Route>
            <Route path="/checkout" component={CheckOut} />
            <Route path="/contact" component={Contact} />
            <Route path="/:user_id" component={PrivateRoute} />
          </Switch>
        </div>
      </BrowserRouter>
    </stateContext.Provider>
  );
}

export default App;
