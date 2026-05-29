import React from "react";
import useCounter from "./hooks/useCounter"

const App = () => {

  const { count , increment} = useCounter();


  return (


    <div>
      <h1>{count}</h1>

      <button onClick={increment}>click</button>

    </div>
  );
};

export default App;
