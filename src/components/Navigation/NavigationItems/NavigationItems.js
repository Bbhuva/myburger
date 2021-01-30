import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import classes from "./NavigationItems.module.css";

// import { Switch } from "react-router-dom";

const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    {/* <Switch> */}
    {props.isAuth ? (
      <NavigationItem link="/orders">Orders</NavigationItem>
    ) : null}
    <NavigationItem link="/" exact>
      Burger Builder
    </NavigationItem>
    {props.isAuth ? (
      <NavigationItem link="/logout" exact>
        Log out
      </NavigationItem>
    ) : (
      <NavigationItem link="/auth" exact>
        LogIn
      </NavigationItem>
    )}

    {/* </Switch> */}
  </ul>
);

export default navigationItems;
