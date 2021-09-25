import React from "react";
import { Alert } from "@material-ui/lab";
const Error = ({ errorMessage, isError }) => {
  return <>{isError && <Alert severity='error'>{errorMessage}</Alert>}</>;
};

export default Error;
