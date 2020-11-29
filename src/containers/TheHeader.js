// import React, { useState } from "react";
import {
  Nav,
  Navbar,
  NavbarBrand,
  // Collapse,
  // NavbarToggler,
  // NavbarText,
  // NavItem,
  // NavLink,
  // UncontrolledDropdown,
  // DropdownToggle,
  // DropdownMenu,
  // DropdownItem,
} from "reactstrap";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const TheHeader = (props) => {
  // const [isOpen, setIsOpen] = useState(false);

  // const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">LuarizPOS</NavbarBrand>
        <Nav className="mr-auto" navbar></Nav>
        <AccountCircleIcon fontSize="large" />
      </Navbar>
    </div>
  );
};

export default TheHeader;
