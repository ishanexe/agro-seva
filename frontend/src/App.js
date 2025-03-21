import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home"; 
import About from "./components/About";
import Contact from "./components/Contact";
import WeatherUpdate from "./components/WeatherUpdate";
import CropInfo from "./components/CropInfo";
import Advisory from "./components/Advisory";
import Schemes from "./components/Schemes";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* for rendering the "element" on the home page */}
        <Route path="/" element={<Home />} />
        <Route path="/WeatherUpdate" element={<WeatherUpdate />} />
        <Route path="/CropInfo" element={<CropInfo />} />
        <Route path="/Advisory" element={<Advisory />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Schemes" element={<Schemes />} />
      </Routes>
    </Router>
  );
}

export default App;
