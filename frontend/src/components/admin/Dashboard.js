import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Metadata from "../layout/MetaData";
import Sidebar from "./Sidebar";

import { getAdminProducts } from "../../actions/productActions";

const Dashboard = () => {

    const dispatch = useDispatch();
    const { products } = useSelector(state => state.product);

    useEffect(() => {
        dispatch(getAdminProducts());
    },[dispatch]);


    let outOfStock=0;
    products.forEach(product =>{
        if(product.stock === 0){
            outOfStock +=1
        }
    });



  return (
    <Fragment>

      <Metadata title={"Admin DashBoard :"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <h4>
            <Sidebar />
          </h4>
        </div>

        <div className="col-12 col-md-10">
          <h1
            className="my-4 greenColor"
            style={{
              textAlign: "center",
              paddingTop: "30px",
              paddingBottom: "30px",
            }}
          >
            Dashboard
          </h1>
          <div className="row pr-4">
            <div className="col-xl-12 col-sm-12 mb-4">
              <div className="card text-black bg-Light o-hidden h-100 dashboardCard">
                <div className="card-body ">
                  <div className="text-center card-font-size">
                    Total Amount
                    <br /> <b>Coming Soon</b>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row pr-4">
            <div className="col-xl-3 col-sm-6 mb-3">
              <div className="card text-black bg-Light o-hidden h-100 dashboardCard">
                <div className="card-body">
                  <div className="text-center card-font-size">
                    No. of Products
                    <br /> <b>{products && products.length}</b>
                  </div>
                </div>
                <Link to='/admin/products' className="card-footer text-success small z-1">
                  <span className="float-left">View Details</span>
                  <span className="float-right">
                    <i className="fa fa-angle-right"></i>
                  </span>
                </Link>
              </div>
            </div>

            <div className="col-xl-3 col-sm-6 mb-3 ">
              <div className="card text-white  o-hidden h-100 dashboardCard">
                <div className="card-body">
                  <div className="text-center card-font-size">
                    Out of Stock Products
                    <br /> <b>{outOfStock}</b>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
