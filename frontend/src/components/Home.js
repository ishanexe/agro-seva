import React from "react";
import videoBg from "../video/dayNight.mp4"; // Import the video
import './Home.css'

const Home = () => {
  return (
    <div className="hero-container">
      <video autoPlay loop muted playsInline className="hero-video">
        <source src={videoBg} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="hero-overlay">
        <h1>Welcome to Agro Seva</h1>
        <h5>"Empowering Farmers for a Better Tomorrow"</h5>
        <button className="hero-button">Explore Services</button>
      </div>
    </div>
  );
};

export default Home;
