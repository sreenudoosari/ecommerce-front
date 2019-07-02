import React from "react";
import { Route, Redirect } from "react-router-dom";
import authService from "../../services/authService";

//path :  url called /entered by the user

//component : component to show ( we renamed it to Component (with capital  C because
//react will complain when you call a component (<Component ... /> with small letter ))

//render : since a route can be called with component or render method
//to make this component reusable for render method also , we accept render method as
//input parameter. We check if the component is empty we will use render method

//rest :  if the user wants to pass any additional properties to the component
//we get them using this  rest property and spread it( ...)

const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
  return (
    <Route
      path={path}
      {...rest}
      exact
      render={props => {
          console.log("props in protected route :", props);
        if (!authService.getCurrentUser()) return <Redirect to="/login" />;
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
