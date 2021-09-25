import React from "react";
import { Route } from "react-router-dom";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import LoadingSpinner from "./LoadingSpinner";
const ProtectedRoute = ({ component, ...args }) => (
  <Route
    component={withAuthenticationRequired(component, {
      onRedirecting: () => <LoadingSpinner display={true} />,
    })}
    {...args}
  />
);

export default ProtectedRoute;
