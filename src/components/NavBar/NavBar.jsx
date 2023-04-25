import React from "react";
import { Link } from "react-router-dom";
import classes from './NavBar.module.css'

const NavBar = (props) => {
  return (
    <div className={classes.navbar}>
      <Link to={props.isLoggedIn ? "/" : "/login"} className={classes.title}>{props.title}</Link>
      <div className={classes.links}>
        {props.children}
      </div>
    </div>
  );
}

export default NavBar;