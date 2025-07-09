import React from "react";
import SideBarLayout from "../SideBar";
import NavBarLayout from "../NavBar";
import "./style.scss"
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div className="mainWrapper">
      <SideBarLayout />
      <div className="contentSide">
        <NavBarLayout />
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
