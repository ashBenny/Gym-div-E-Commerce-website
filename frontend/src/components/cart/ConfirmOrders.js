import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";

import { useSelector } from "react-redux";

const ConfirmOrder = ({ history }) => {
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  // Calculate Order Prices
  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingPrice = itemsPrice > 10000 ? 0 : 200;
  const taxPrice = Number((0.02 * itemsPrice).toFixed(2));
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const processToPayment = () => {
    const data = {
      itemsPrice: itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    };

    // storing the order details in session storage for the further payment
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    history.push("/payment");
  };

  return (
    <Fragment>
      <MetaData title={"Confirm Order :"} />

      <CheckoutSteps shipping confirmOrder />

      <div className="row d-flex justify-content-between">
        <div className="col-12 col-lg-8 mt-5 order-confirm">
          <h4 className="mb-3 greenColor">Shipping Info</h4>
          <p className="productHead">
            <b>Name :</b> {user && user.name}
          </p>
          <p className="productHead">
            <b>Phone Number :</b> {shippingInfo.phoneNo}
          </p>
          <p className="mb-4 productHead">
            <b>Address :</b>{" "}
            {`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`}
          </p>

          <hr />
          <h4 className="mt-4 greenColor">Your Cart Items:</h4>

          {cartItems.map((item) => (
            <Fragment>
              <hr />
              <div className="cart-item my-1" key={item.product}>
                <div className="row">
                  <div className="col-4 col-lg-2">
                    <img
                      src={item.image}
                      alt="product"
                      height="50"
                      width="65"
                    />
                  </div>

                  <div className="col-5 col-lg-6 ">
                    <Link
                      to={`/product/${item.product}`}
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      {item.name}
                    </Link>
                  </div>

                  <div className="col-4 col-lg-4 mt-4 mt-lg-0 productHead">
                    <p>
                      {item.quantity} x Rs. {item.price} ={" "}
                      <b>Rs. {(item.quantity * item.price).toFixed(2)}</b>
                    </p>
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
            <hr />
            <p className="productHead">
              Subtotal :
              <span className="order-summary-values">Rs {itemsPrice}</span>
            </p>
            <p className="productHead">
              Shipping Charge :
              <span className="order-summary-values">Rs {shippingPrice}</span>
            </p>
            <p className="productHead">
              GST : <span className="order-summary-values">Rs {taxPrice}</span>
            </p>

            <hr />

            <p className="greenColor">
              Total:{" "}
              <span className="order-summary-values ">Rs {totalPrice}</span>
            </p>

            <hr />
            <button
              id="checkout_btn"
              className="btn btn-primary btn-block"
              onClick={processToPayment}
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
