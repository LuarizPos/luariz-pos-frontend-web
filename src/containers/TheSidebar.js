import React, { useState } from "react";
import { Tooltip } from "reactstrap";
import Dashboard from "@material-ui/icons/Dashboard";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import CategoryIcon from "@material-ui/icons/Category";
import PostAddIcon from "@material-ui/icons/PostAdd";
import SettingsIcon from "@material-ui/icons/Settings";
import { Redirect, NavLink } from "react-router-dom";

function TheSidebar() {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggle = () => setTooltipOpen(!tooltipOpen);

  const CustomTooltip = (props) => {
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

      <NavLink
        to="/dashboard"
        style={customStyle}
        activeStyle={customActiveStyle}
      >
        <div className="py-3" id="DisabledAutoHideExample">
          <Dashboard fontSize={customFontSize} />
        </div>
        <CustomTooltip target="DisabledAutoHideExample" text="Dashboard menu" />
      </NavLink>

      <NavLink to="/order" style={customStyle} activeStyle={customActiveStyle}>
        <div className="py-3">
          <AddShoppingCartIcon fontSize={customFontSize} />
        </div>
      </NavLink>
      <NavLink
        to="/category"
        style={customStyle}
        activeStyle={customActiveStyle}
      >
        <div className="py-3">
          <CategoryIcon fontSize={customFontSize} />
        </div>
      </NavLink>
      <NavLink
        to="/product"
        style={customStyle}
        activeStyle={customActiveStyle}
      >
        <div className="py-3">
          <PostAddIcon fontSize={customFontSize} />
        </div>
      </NavLink>
      <NavLink
        to="/setting"
        style={customStyle}
        activeStyle={customActiveStyle}
      >
        <div className="py-3">
          <SettingsIcon fontSize={customFontSize} />
        </div>
      </NavLink>
    </div>
  );
}

export default TheSidebar;
