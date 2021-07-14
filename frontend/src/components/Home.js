import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import Pagination from "react-js-pagination";
import slider from "rc-slider";
import "rc-slider/assets/index.css";

import MetaData from "./layout/MetaData";
import { getProducts } from "../actions/productActions";
import Product from "./products/Product";
import Loader from "../components/layout/Loader";

// Pricr filter
const { createSliderWithTooltip } = slider;
const Range = createSliderWithTooltip(slider.Range);

const Home = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 100000]);

  //loading from state
  const { loading, products, error, productsCount, productsPerPage } =
    useSelector((state) => state.product);

  //getting search keyword
  const keyword = match.params.keyword;

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProducts(keyword, currentPage, price));
  }, [dispatch, alert, error, keyword, currentPage, price]);

  function setCurrentPageNumber(pageNumber) {
    setCurrentPage(pageNumber);
  }

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={"Get Fit By"} />

          <h1 id="product_heading">Branded Gym Equipments !!</h1>
          <section id="products" className="container mt-5">
            <div className="row">
              {keyword ? (
                <Fragment>
                  <div className="col-6 col-med-3 t-5 mb-5">
                    <div className="px5">
                      <Range
                        marks={{ 1: "Rs. 1", 100000: "Rs. 100000" }}
                        min={1}
                        max={100000}
                        defaultValue={[1, 100000]}
                        tipFormatter={(value) => `Rs${value}`}
                        tipProps={{ placement: "top", visible: true }}
                        value={price}
                        onChange={(price) => setPrice(price)}
                      />
                    </div>

                    <div className="col-6 col-md-9">
                      <div className="row">
                        {products &&
                          products.map((product) => (
                            <Product
                              key={product.id}
                              product={product}
                              col={6}
                            />
                          ))}
                      </div>
                    </div>
                  </div>
                </Fragment>
              ) : (
                products &&
                products.map((product) => (
                  <Product key={product.id} product={product} col={3} />
                ))
              )}
            </div>
          </section>

          <div className="d-flex justfy -container-center mt-5">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={productsPerPage}
              totalItemsCount={productsCount}
              pageRangeDisplayed={5}
              onChange={setCurrentPageNumber}
              itemClass="page-item"
              linkClass="page-link"
            />
          </div>
        </>
      )}
    </Fragment>
  );
};
export default Home;
