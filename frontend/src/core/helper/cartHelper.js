import { API } from "../../backend";

export const addItemToCart = (item, next) => {
  let cart = [];
  if (typeof window !== undefined) {
    // console.log("Window type", typeof window.history);
    if (localStorage.getItem("cart")) {
      console.log("Local Storage", localStorage);
      cart = JSON.parse(localStorage.getItem("cart"));
      // console.log("Cart", cart);
    }
    if (localStorage.getItem("cart")) {
    }
    cart.push({
      ...item,
      count: 1,
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    next();
  }
};

export const loadCart = () => {
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      // console.log("Local Storage", localStorage);
      return JSON.parse(localStorage.getItem("cart"));
    }
  }
};

export const removeItemFromCart = (productId) => {
  let cart = [];

  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.map((product, index) => {
      if (product._id === productId) {
        cart.splice(index, 1);
      }
    });
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  return cart;
};

export const cartEmpty = (next) => {
  if (typeof window !== undefined) {
    let cart = [];
    localStorage.removeItem("cart");
    localStorage.setItem("cart", JSON.stringify(cart));
    next();
  }
};
