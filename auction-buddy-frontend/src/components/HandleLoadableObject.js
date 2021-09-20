import React from "react";

const HandleLoadableObject = ({ loadableObject, updatingFunction }) => {
  return (
    <>
      {loadableObject.state === "hasValue" &&
        loadableObject?.contents &&
        updatingFunction(loadableObject.contents)}
      {loadableObject.state === "loading" && <>loading</>}
      {loadableObject.state === "hasError" && <>{loadableObject.contents}</>}
    </>
  );
};

export default HandleLoadableObject;
