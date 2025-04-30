import React, { useRef } from "react";
import videoBg from "../video/dayNight.mp4"; // Import the video
import './Home.css';
import { Link } from 'react-router-dom';
// Add icons for the service cards
import { FaLeaf, FaTractor, FaCloudSun, FaHandHoldingUsd, FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Home = () => {
  const servicesRef = useRef(null);

  const scrollToServices = () => {
    servicesRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const role = localStorage.getItem("userType");
  
  console.log("userRole:",role);

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
    {(role === 'farmer' ||  role==='admin') &&(
      <Link to="/WeatherUpdate" className="service-link-button">
        Check Weather
      </Link>
    )}
  </div>

  <div className="service-card">
    <FaHandHoldingUsd className="service-icon" />
    <h3>Government Schemes</h3>
    <p>Information on subsidies, loans and government programs</p>
    {(role === 'farmer' ||  role==='admin') &&(
      <Link to="/schemes" className="service-link-button">
        Explore Schemes
      </Link>
    )}
  </div>

  <div className="service-card">
    <FaTractor className="service-icon" />
    <h3>Advisory Services</h3>
    <p>Expert guidance and recommendations for your farm</p>
    {(role === 'farmer' || role==='admin') &&(
      <Link to="/advisory" className="service-link-button">
        Get Advice
      </Link>
    )}
  </div>

  <div className="service-card">
    <FaLeaf className="service-icon" />
    <h3>Crop Rates</h3>
    <p>Latest market prices and trends for various crops</p>
    {(role === 'admin' || role==='farmer' )&& (
      <Link to="/cropInfo" className="service-link-button">
        View Rates
      </Link>
    )}
  </div>
</div>

      </div>

      <footer style={{
        backgroundColor: "#4B5320",
        padding: "40px 20px",
        marginTop: "40px",
        color: "#fff"
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "40px",
          textAlign: "left"
        }}>
          <div>
            <h3 style={{ color: "#fff", marginBottom: "20px", fontWeight: "600" }}>Contact Us</h3>
            <p style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px", color: "#E8E8E8" }}>
              <FaPhone /> +91 98765xxxxx  
            </p>
            <p style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px", color: "#E8E8E8" }}>
              <FaEnvelope /> contact@agroseva.com
            </p>
            <p style={{ display: "flex", alignItems: "center", gap: "10px", color: "#E8E8E8" }}>
              <FaMapMarkerAlt /> 123 Agro Seva Road, India
            </p>
          </div>

          <div>
            <h3 style={{ color: "#fff", marginBottom: "20px", fontWeight: "600" }}>Quick Links</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={{ marginBottom: "10px" }}><Link to="/about" style={{ color: "#E8E8E8", textDecoration: "none", transition: "color 0.3s" }}>About Us</Link></li>
              <li style={{ marginBottom: "10px" }}><Link to="/contact" style={{ color: "#E8E8E8", textDecoration: "none", transition: "color 0.3s" }}>Contact</Link></li>
              <li style={{ marginBottom: "10px" }}><Link to="/schemes" style={{ color: "#E8E8E8", textDecoration: "none", transition: "color 0.3s" }}>Schemes</Link></li>
              <li><Link to="/advisory" style={{ color: "#E8E8E8", textDecoration: "none", transition: "color 0.3s" }}>Advisory</Link></li>
            </ul>
          </div>

          <div>
            <h3 style={{ color: "#fff", marginBottom: "20px", fontWeight: "600" }}>Follow Us</h3>
            <div style={{ display: "flex", gap: "20px" }}>
              <a href="#" style={{ color: "#E8E8E8", fontSize: "24px", transition: "color 0.3s" }}><FaFacebook /></a>
              <a href="#" style={{ color: "#E8E8E8", fontSize: "24px", transition: "color 0.3s" }}><FaTwitter /></a>
              <a href="#" style={{ color: "#E8E8E8", fontSize: "24px", transition: "color 0.3s" }}><FaInstagram /></a>
            </div>
          </div>
        </div>

        <div style={{
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          marginTop: "40px",
          paddingTop: "20px",
          textAlign: "center",
          color: "#E8E8E8"
        }}>
          <p>&copy; 2024 Agro Seva. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Home;