import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";
import { countries } from "countries-list";

import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import { saveShippingDetails } from "../../actions/cartActions";
import {CheckoutSteps} from './CheckoutSteps';

const Shipping = ({ history }) => {

  const countriesList = Object.values(countries);

  const { shippingDetails } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingDetails.address);
  const [city, setCity] = useState(shippingDetails.city);
  const [phoneNo, setPhoneNo] = useState(shippingDetails.phoneNo);
  const [postalCode, setPostalCode] = useState(shippingDetails.postalCode);
  const [country, setCountry] = useState(shippingDetails.country);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingDetails({ address, city, phoneNo, postalCode, country })
    );
    history.push("/order/confirm");
  };

  

  return (
    <Fragment>
      <MetaData title={"Shipping Details :"} />

      <CheckoutSteps shipping />

      <div className="row wrapper">
      <div className="col-12 col-lg-5">
        <form  id="cardBorder" className="shadow-lg" onSubmit={submitHandler}>
          <h1 className="mb-4 greenColor">Shipping Details</h1>
          <div className="form-group productHead">
            <label htmlFor="address_field ">Address</label>
            <input
              type="text"
              id="address_field"
              className="form-control"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div className="form-group productHead">
            <label htmlFor="city_field ">City</label>
            <input
              type="text"
              id="city_field"
              className="form-control"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>

          <div className="form-group productHead">
            <label htmlFor="phone_field ">Contact Number</label>
            <input
              type="phone"
              id="phone_field"
              className="form-control"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              required
            />
          </div>

          <div className="form-group productHead">
            <label htmlFor="postal_code_field ">Postal Code</label>
            <input
              type="text"
              id="postal_code_field"
              className="form-control"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
          </div>

          <div className="form-group productHead">
            <label htmlFor="country_field ">Country</label>
            <select 
                id="country_field" 
                className="form-control" 
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required >

                {countriesList.map((country) =>(
                    <option key={country.name} value={country.name}>
                        {country.name}
                    </option>
                ))}
              
            </select>
          </div>

          <button id="shipping_btn" type="submit" className="btn btn-block py-3">
            CONTINUE
          </button>
        </form>
      </div>
      </div>
    </Fragment>
  );
};

export default Shipping;
