import React, { useState } from "react";
import { Nav, Navbar, NavbarBrand } from "reactstrap";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useDispatch } from "react-redux";
import { doLogout } from "../store/actions/loginActions";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const TheHeader = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [backdropOpen, setBackdropOpen] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseBackdrop = () => {
    setBackdropOpen(false);
  };

  const handleLogout = () => {
    setBackdropOpen(true);
    setButtonDisabled(true);
    dispatch(doLogout());
  };

  return (
    <div>
      <Backdrop
        className={classes.backdrop}
        open={backdropOpen}
        onClick={handleCloseBackdrop}
        style={{ pointerEvents: "none" }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">LuarizPOS</NavbarBrand>
        <Nav className="mr-auto" navbar></Nav>
        <AccountCircleIcon
          fontSize="large"
          aria-controls="fade-menu"
          aria-haspopup="true"
          onClick={handleClick}
        />
        <Menu
          id="fade-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          <MenuItem onClick={handleClose} disabled={buttonDisabled}>
            <AccountCircleIcon className="mr-2" />
            My account
          </MenuItem>
          <MenuItem onClick={handleLogout} disabled={buttonDisabled}>
            <ExitToAppIcon className="mr-2" />
            Logout
          </MenuItem>
        </Menu>
      </Navbar>
    </div>
  );
};

export default TheHeader;
