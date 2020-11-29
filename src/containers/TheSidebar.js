import React, { useState } from "react";
import { Tooltip } from "reactstrap";
import Dashboard from "@material-ui/icons/Dashboard";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import CategoryIcon from "@material-ui/icons/Category";
import PostAddIcon from "@material-ui/icons/PostAdd";
import SettingsIcon from "@material-ui/icons/Settings";
import { Redirect, NavLink } from "react-router-dom";

function TheSidebar() {
  const CustomTooltip = (props) => {
    const [tooltipOpen, setTooltipOpen] = useState(false);

    const toggle = () => setTooltipOpen(!tooltipOpen);
    return (
      <Tooltip
        placement="right"
        isOpen={tooltipOpen}
        autohide={false}
        target={props.target}
        toggle={toggle}
      >
        {props.text}
      </Tooltip>
    );
  };

  const customFontSize = window.screen.width > 720 ? "default" : "inherit";

  const customStyle = { color: "darkslategray", textDecoration: "none" };
  const customActiveStyle = { fontWeight: "bold", color: "white" };

  return (
    <div className="bg-info rounded text-center">
      <Redirect from="/" to="/dashboard" />

      {/* Dashboard Menu */}
      <NavLink
        to="/dashboard"
        style={customStyle}
        activeStyle={customActiveStyle}
      >
        <div className="py-3" id="Dashboard">
          <Dashboard fontSize={customFontSize} />
        </div>
        <CustomTooltip target="Dashboard" text="Dashboard" />
      </NavLink>
      {/* Dashboard Menu */}

      {/* Order Menu */}
      <NavLink to="/order" style={customStyle} activeStyle={customActiveStyle}>
        <div className="py-3" id="Order">
          <AddShoppingCartIcon fontSize={customFontSize} />
        </div>
        <CustomTooltip target="Order" text="Order" />
      </NavLink>
      {/* Order Menu */}

      {/* Category Menu */}
      <NavLink to="/category" style={customStyle} activeStyle={customActiveStyle}>
        <div className="py-3" id="Category">
          <CategoryIcon fontSize={customFontSize} />
        </div>
        <CustomTooltip target="Category" text="Category" />
      </NavLink>
      {/* Category Menu */}

      {/* Product Menu */}
      <NavLink to="/product" style={customStyle} activeStyle={customActiveStyle}>
        <div className="py-3" id="Product">
          <PostAddIcon fontSize={customFontSize} />
        </div>
        <CustomTooltip target="Product" text="Product" />
      </NavLink>
      {/* Product Menu */}

      {/* Setting Menu */}
      <NavLink to="/setting" style={customStyle} activeStyle={customActiveStyle}>
        <div className="py-3" id="Setting">
          <SettingsIcon fontSize={customFontSize} />
        </div>
        <CustomTooltip target="Setting" text="Setting" />
      </NavLink>
      {/* Setting Menu */}
    </div>
  );
}

export default TheSidebar;
