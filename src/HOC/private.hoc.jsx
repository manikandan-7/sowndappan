import React from "react";
import { getDataFromLocalStorage } from "../store/store";
import { Route, Redirect } from "react-router-dom";

const Private = ({ component: Component, ...rest }) => {
  let user = getDataFromLocalStorage("currentUserDetails");
  return (
    <div>
      <Route {...rest} render={props => (Object.keys(user).length ? <Component {...props} /> : <Redirect to="/login" />)} />
    </div>
  );
};
export default Private;
