import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Metadata from "../layout/MetaData";
import Loader from "../layout/Loader";

const Profile = () => {
  const { user, loading } = useSelector((state) => state.auth);

  return (
    <Fragment>
      {loading ? ( <Loader /> ) 
      : (
        <Fragment>
          <Metadata title={"Profile Page :"} />

          <h2 className="mt-5 ml-5 greenColor">My Profile</h2>
          <div className="row justify-content-around mt-5 user-info">
            <div className="col-12 col-md-3">
              <figure className="avatar avatar-profile">
                <img className="rounded-circle img-fluid" src={user.avatar.url} alt={user.name} />
              </figure>
              <Link 
                to='/profile/update'
                id="edit_profile"
                className="btn btn-primary btn-block my-5"
              >
                Edit Profile
              </Link>
            </div>

            <div className="col-12 col-md-5">
              <h4>Name :</h4>
              <p  className="productHead">{user.name}</p>

              <h4>Email Address :</h4>
              <p className="productHead">{user.email}</p>
              <br/>
              
              <Link to="/password/update" className="btn btn-danger btn-block mt-3">
                Change Password
              </Link>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
