 

export const initState = {
  products: [
    { id: 1, rating: 5, title: "Galaxy Tab A3 Core", img: "picture", price: 20000, discount: '20%', quantity: 0 },
    { id: 2, rating: 3, title: "Samsung A1", img: "picture", price: 45000, discount: '5%',  quantity: 0 },
    { id: 3, rating: 2, title: "LG UHD Smart TV", img: "picture", price: 10000, discount: '30%',  quantity: 0 },
    { id: 4, rating: 4, title: "Laptop", img: "picture", price: 60000, discount: '100%',  quantity: 0 },
    { id: 5, rating: 4, title: "Air Conditioner", img: "picture", price: 90000, discount: '10%',  quantity: 0 },
    { id: 6, rating: 4, title: "Mac Book Pro", img: "picture", price: 160000, discount: '2%',  quantity: 0 },
    { id: 7, rating: 4, title: "Play Station", img: "picture", price: 260000, discount: '18%',  quantity: 0 },
  ],
};
export const reducer = (state, action) => {
  switch (action.type) {
    
    default:
      return state;
  }
};
