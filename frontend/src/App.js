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
import Signup from "./components/Signup";
import Login from "./components/Login";
import CropRecommendation from "./components/CropRecommendation";
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />

        {/* Protected Routes (Only for Logged-in Users) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/weatherupdate" element={<WeatherUpdate />} />
          <Route path="/cropinfo" element={<CropInfo />} />
          <Route path="/advisory" element={<Advisory />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/schemes" element={<Schemes />} />
          <Route path="/crop-recommendation" element={<CropRecommendation />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
