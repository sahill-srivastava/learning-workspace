import React from "react";
import { useRouteError } from "react-router-dom";


const Page404 = () => {
  const err = useRouteError();


  return (
    <div>
      <h1>Oops!!! Something went wrong</h1>
      <div>{err.status} - {err.statusText}</div>
    </div>
  );
};

export default Page404;
