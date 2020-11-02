export const addItemToMyCart = (cart, newItem) => {
  const itemExits = cart.find((item) => item.id === newItem.id);

  if (itemExits) {
    console.log('Yes item Exits')
    // Re-create a New Array to be saved as the new cart OR
    // Update the quantity property while mapping through the cart
    const newArray = cart.map((item) =>
      item.id === newItem.id
        ? { ...item, quantity: (item.quantity + 1) }
        : item
    );
    console.log('The new Array b4 returning it!', newArray)
    return newArray;
  } else {
    console.log('No Item Does not exits')
    return [...cart, newItem];
  }
};

export const increamentQty = (cart, ID) => {
  const newCart = [...cart];
  const newArray = newCart.map((item) =>
    item.id === ID
      ? { ...item, quantity: ( item.quantity + 1) }
      : item
  );
  return newArray;
};

export const decreamentQty = (cart, ID) => {
  const newCart = [...cart];
  const newArray = newCart.map((item) =>
    item.id === ID
      ? { ...item, quantity: ( item.quantity > 1 ? item.quantity - 1 : 1) }
      : item
  );
  return newArray;
};

/* ========================================================================================================= */

/* const addItemToCart = (cartItems, cartItemToAdd) => {
    //find(condition) finds the first item in the array based on the condition. 
    const existingCartItem = cartItems.find(item => item.id === cartItemToAdd.id);
    
    if (existingCartItem) {
        
        //in order for change detection to trigger we have to rerender
         //otherwise our quantity property will not be updated //map will return a new array
          //we need to return new versions of our state so that our component know to re render
           //here we update the quantity property
        
        return cartItems.map((item) =>
            item.id === cartItemToAdd.id
            ? { ...cartItemToAdd, quantity: item.quantity + 1 }
            : item
    );
    }; //when you first time add a new item, sine exixtingCartItem will be falsy, it will pass the first if block and will come here
 //quantity property gets attached the first time around since this if block wont run when it is a new item.
  //in the beginning cartItems array is empty. every time you add a new item to this array, it will add "quantity:1" to this item object. return [...cartItems, { ...cartItemToAdd, quantity: 1 }]; };
 */
