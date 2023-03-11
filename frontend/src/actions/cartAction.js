import axios from "axios";
import { ADD_TO_CART, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO } from "../constants/cartConstants";

//TODO: Add Product To Cart Action
export const addItemsToCart = (id, quentity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/product/${id}`);

  console.log(3);

  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: data.product._id,
      name: data.product.name, 
      price: data.product.price,
      image: data.product.images[0].url,
      stock: data.product.stock,
      quentity,
    },
  });

  //? Product save to local storage as the collection of cartItems
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

//TODO: Remove Product From Cart Action
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: id,
  });

  //? Product save to local storage as the collection of cartItems
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};


//TODO: Save Shipping Information
export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });

  //? Shipping Information save to local storage as the collection of shippingInfo
  localStorage.setItem("shippingInfo", JSON.stringify(data));
};