import React, { useState } from "react";
import useCounter from "./hooks/useCounter";
import useOnlineStatus from "./hooks/useOnlineStatus";

const App = () => {
  const { count, increment } = useCounter();

  const isOnline = useOnlineStatus();

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={increment}>click</button>
      <h2>{isOnline ? "Online" : "Offline"}</h2>
    </div>
  );
};

export default App;
