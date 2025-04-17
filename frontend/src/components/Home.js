import React, { useRef } from "react";
import videoBg from "../video/dayNight.mp4"; // Import the video
import './Home.css';
import { Link } from 'react-router-dom';
// Add icons for the service cards
import { FaLeaf, FaTractor, FaCloudSun, FaHandHoldingUsd } from 'react-icons/fa';

const Home = () => {
  const servicesRef = useRef(null);

  const scrollToServices = () => {
    servicesRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div className="hero-container">
        <video autoPlay loop muted playsInline className="hero-video">
          <source src={videoBg} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="hero-overlay">
          <h1>Welcome to Agro Seva</h1>
          <h5>"Empowering Farmers for a Better Tomorrow"</h5>
          <button className="hero-button" onClick={scrollToServices}>Explore Services</button>
        </div>
      </div>
      
      <div className="services-section" ref={servicesRef}>
        <h2>Our Services</h2>
        <div className="services-container">
          <div className="service-card">
            <FaCloudSun className="service-icon" />
            <h3>Weather Insights</h3>
            <p>Accurate weather forecasts to plan your farming activities</p>
            <Link to="/WeatherUpdate" className="service-link-button">
              Check Weather
            </Link>
          </div>
          
          <div className="service-card">
            <FaHandHoldingUsd className="service-icon" />
            <h3>Government Schemes</h3>
            <p>Information on subsidies, loans and government programs</p>
            <Link to="/schemes" className="service-link-button">
              Explore Schemes
            </Link>
          </div>
          <div className="service-card">
            <FaTractor className="service-icon" />
            <h3>Advisory Services</h3>
            <p>Expert guidance and recommendations for your farm</p>
            <Link to="/advisory" className="service-link-button">
              Get Advice
            </Link>
          </div>
          <div className="service-card">
            <FaLeaf className="service-icon" />
            <h3>Crop Rates</h3>
            <p>Latest market prices and trends for various crops</p>
            <Link to="/cropInfo" className="service-link-button">
              View Rates
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
