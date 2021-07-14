import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar-wrapper">
      <nav id="sidebar">
        <ul className="list-unstyled components">
          <li>
            <Link to="/dashboard"> Dashboard</Link>
          </li>
          <li>
            <Link to="/admin/products"> All Products</Link>
          </li>

          <li>
            <Link to="/admin/product"> Create Product</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
