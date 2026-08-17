import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div>hello1</div>} />
          <Route path="/login" element={<div>hello2</div>} />
        </Routes>
      </BrowserRouter>
      <Navbar />
      <h1 className="text-6xl">Hello World</h1>
    </>
  );
};

export default App;
