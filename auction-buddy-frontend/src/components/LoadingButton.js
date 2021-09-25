import React from "react";
import { Button, CircularProgress } from "@material-ui/core";
const LoadingButton = ({ loading, title, ...otherProps }) => {
  return (
    <Button {...otherProps}>{!loading ? title : <CircularProgress />}</Button>
  );
};

export default LoadingButton;
