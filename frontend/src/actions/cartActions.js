import axios from 'axios'
import { ADD_TO_CART, DELETE_FROM_CART, SAVE_SHIPPING_INFO } from '../constants/cartConstants'


// ADD ITEM TO CART

export const addItemToCart = (id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/product/${id}`)

    dispatch({
        type: ADD_TO_CART,
        payload: {
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].url,
            stock: data.product.stock,
            quantity
        }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

// DELETE ITEM FROM CART

export const deleteItemFromCart = (id) => async (dispatch, getState) => {

    dispatch({
        type: DELETE_FROM_CART,
        payload: id
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
};

// GET SHIPPING DETAILS

export const saveShippingDetails = (data) => async (dispatch) => {

    dispatch({
        type: SAVE_SHIPPING_INFO,
        payload: data
    })

    localStorage.setItem('shippingDetails', JSON.stringify(data))
};