import {
  addItemToMyCart,
  increamentQty,
  decreamentQty,
} from "../utility/cartUtility";

export const initCart = [];

export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return (state = addItemToMyCart(state, action.payload));
    case "REMOVE_FROM_CART":
      /*  return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload)
      } */

      let newCart = [...state];

      //Find the Index first
      const index = state.findIndex((item) => item.id === action.payload);

      index >= 0
        ? newCart.splice(index, 1)
        : console.warn("prince trouble removing items");
      // Then return the new State!
      return (state = newCart);
    case "INCREASE_QUANTITY":
      return (state = increamentQty(state, action.payload));
    case "REDUCE_QUANTITY":
      return (state = decreamentQty(state, action.payload));
    case "CLEAR_CART":
      return []
    default:
      return state;
  }
};
