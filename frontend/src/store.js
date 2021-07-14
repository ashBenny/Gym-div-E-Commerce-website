import {createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import {productsReducer,productsDetailsReducer,newProductReducer,deleteAndUpdateReducer} from'./reducers/productReducers';
import {authReducer,userReducer,forgotPasswordReducer} from'./reducers/userReducers';
import { cartReducer } from './reducers/cartReducers';
import { orderReducer } from './reducers/orderReducer';



const reducer = combineReducers({
        product : productsReducer,
        productDetails : productsDetailsReducer,
        newProduct : newProductReducer,
        deleteAndUpdate :deleteAndUpdateReducer,
        auth : authReducer,
        user : userReducer,
        forgotPassword : forgotPasswordReducer,
        cart : cartReducer,
        newOrder : orderReducer,
    // myAllOrders : myOrderReducer

});

let initialState  = {
    cart: {
        cartItems: 
            localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
        shippingDetails: 
            localStorage.getItem('shippingDetails') ? JSON.parse(localStorage.getItem('shippingDetails')) : {}
    }
}
const middlware = [thunk];
const store = createStore(reducer,initialState ,composeWithDevTools(applyMiddleware(...middlware)))

export default store 