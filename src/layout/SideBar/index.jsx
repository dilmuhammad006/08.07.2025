import React from "react";
import "./style.scss";
import { NavLink } from "react-router";

const SideBarLayout = () => {
  return (
    <div className="sideWrapper">
      <ul>
        <li>
          <NavLink to="/dashboard/products">Products</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/posts">Posts</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/users">Users</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SideBarLayout;
