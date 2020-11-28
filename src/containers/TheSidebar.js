import React from "react";
import Dashboard from "@material-ui/icons/Dashboard";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import CategoryIcon from "@material-ui/icons/Category";
import PostAddIcon from "@material-ui/icons/PostAdd";
import SettingsIcon from "@material-ui/icons/Settings";
import { Redirect, NavLink } from "react-router-dom";

function TheSidebar() {
  const customStyle = { color: "darkslategray", textDecoration: "none" };
  const customActiveStyle = { fontWeight: "bold", color: "white" };

  return (
    <div className="d-flex flex-column bg-info rounded text-center">
      <Redirect from="/" to="/dashboard" />
      <NavLink
        to="/dashboard"
        style={customStyle}
        activeStyle={customActiveStyle}
      >
        <div className="p-1 m-3">
          <Dashboard fontSize="large" />
        </div>
      </NavLink>
      <NavLink to="/order" style={customStyle} activeStyle={customActiveStyle}>
        <div className="p-1 m-3">
          <AddShoppingCartIcon fontSize="large" />
        </div>
      </NavLink>
      <NavLink
        to="/category"
        style={customStyle}
        activeStyle={customActiveStyle}
      >
        <div className="p-1 m-3">
          <CategoryIcon fontSize="large" />
        </div>
      </NavLink>
      <NavLink
        to="/product"
        style={customStyle}
        activeStyle={customActiveStyle}
      >
        <div className="p-1 m-3">
          <PostAddIcon fontSize="large" />
        </div>
      </NavLink>
      <NavLink
        to="/setting"
        style={customStyle}
        activeStyle={customActiveStyle}
      >
        <div className="p-1 m-3">
          <SettingsIcon fontSize="large" />
        </div>
      </NavLink>
    </div>
  );
}

export default TheSidebar;
