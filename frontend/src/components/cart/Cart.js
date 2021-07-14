import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import MetaData from "../layout/MetaData";
import { addItemToCart, deleteItemFromCart } from "../../actions/cartActions";

const Cart = ({ history }) => {
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  const increaseQty = (id, quantity, stock) => {
    const newQuantity = quantity + 1;

    if (newQuantity > stock) return;

    dispatch(addItemToCart(id, newQuantity));
  };

  const decreaseQty = (id, quantity) => {
    const newQuantity = quantity - 1;

    if (newQuantity <= 0) return;

    dispatch(addItemToCart(id, newQuantity));
  };

  const deleteItemHandler = (id) => {
    dispatch(deleteItemFromCart(id));
  };

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping')
}


  return (
    <Fragment>
      <MetaData title={"Cart Page :"} />

      {cartItems.length === 0 ? (
        <>
        <h2 className=" greenColor oops_head">Oops !! Your Cart is Empty</h2>
        
        </>
      ) : (
        <Fragment>
          <h2 className="mt-5 greenColor">
            Your Cart : {cartItems.length} items
          </h2>

          <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8">
              {cartItems.map((item) => (
                <Fragment>
                  <hr />

                  <div className="cart-item" key={item.product}>
                    <div className="row">
                      <div className="col-4 col-lg-3">
                        <img
                          src={item.image}
                          alt="Laptop"
                          height="90"
                          width="115"
                        />
                      </div>

                      <div className="col-5 col-lg-3 " >
                        <Link to={`/product/${item.product}`} style={{textDecoration:'none',color:'white'}} > {item.name} </Link>
                      </div>

                      <div className="col-4 col-lg-2 mt-4 mt-lg-0 ">
                        <p id="card_item_price">Rs {item.price}</p>
                      </div>

                      <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                        <div className="stockCounter d-inline">
                          <span
                            className="btn btn-danger minus"
                            onClick={() =>
                              decreaseQty(item.product, item.quantity)
                            }
                          >
                            -
                          </span>

                          <input
                            type="number"
                            className="form-control count d-inline"
                            value={item.quantity}
                            readOnly
                          />

                          <span
                            className="btn btn-primary plus"
                            onClick={() =>
                              increaseQty(
                                item.product,
                                item.quantity,
                                item.stock
                              )
                            }
                          >
                            +
                          </span>
                        </div>
                      </div>

                      <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                        <i
                          id="delete_cart_item"
                          className="fa fa-trash btn btn-danger"
                          onClick={()=>{deleteItemHandler(item.product)}}
                        ></i>
                      </div>
                    </div>
                  </div>
                  <hr />
                </Fragment>
              ))}
            </div>

            <div className="col-12 col-lg-3 my-4">
              <div id="order_summary">
                <h4 className="greenColor">Order Summary</h4>
                <hr id="productHead" />
                <p className="productHead">
                  No. of Prducts :
                  <span className="order-summary-values">
                    {cartItems.reduce((acc, item) => (acc + Number(item.quantity)), 0)}
                  </span>
                </p>
                <p className="productHead">
                  Total Price (Rs) :
                  <span className="order-summary-values">
                  {cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)}           
                  </span>                 
                </p>

                <hr />
                <button id="checkout_btn" className="btn  btn-block" onClick={checkoutHandler}>
                  Check out
                </button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;
