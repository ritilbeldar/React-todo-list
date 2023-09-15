import React from "react";
import NavBar from "./components/NavBar";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";

const App = () => {
  return (
    <div className="container-fluid">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
