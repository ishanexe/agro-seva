import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaHome, FaCloudSun, FaLeaf, FaBook, FaHandHoldingUsd, FaInfoCircle, FaPhoneAlt } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const [scrolled, setScrolled] = useState(false);

  // Track scroll position to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Check if the link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav 
      className={`navbar navbar-expand-lg sticky-top ${scrolled ? 'scrolled' : ''}`}
      style={{ 
        background: scrolled ? "rgba(255, 255, 255, 0.95)" : "rgba(255, 255, 255, 0.85)",
        boxShadow: scrolled ? "0 5px 15px rgba(0, 0, 0, 0.08)" : "0 2px 10px rgba(0, 0, 0, 0.05)",
        backdropFilter: "blur(10px)",
        transition: "all 0.3s ease",
        padding: "10px 0"
      }}
    >
      <div className="container">
        <Link 
          className="navbar-brand" 
          to="/"
          style={{
            fontSize: "1.5rem",
            fontWeight: "700",
            color: "#4B5320",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}
        >
          <img 
            src="/logo.png" 
            alt="Agro Seva" 
            style={{ height: "32px", width: "auto" }}
            onError={(e) => {
              e.target.style.display = 'none'; // Hide image if not found
            }}
          />
          Agro Seva
        </Link>
        
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{
            border: "none",
            outline: "none",
            boxShadow: "none",
            color: "#4B5320"
          }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive("/") ? "active" : ""}`} 
                to="/"
                style={{
                  fontWeight: "500",
                  color: isActive("/") ? "#4B5320" : "#555",
                  borderBottom: isActive("/") ? "2px solid #6B8E23" : "2px solid transparent",
                  margin: "0 5px",
                  padding: "8px 15px",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px"
                }}
              >
                <FaHome /> Home
              </Link>
            </li>
            
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive("/WeatherUpdate") ? "active" : ""}`} 
                to="/WeatherUpdate"
                style={{
                  fontWeight: "500",
                  color: isActive("/WeatherUpdate") ? "#4B5320" : "#555",
                  borderBottom: isActive("/WeatherUpdate") ? "2px solid #6B8E23" : "2px solid transparent",
                  margin: "0 5px",
                  padding: "8px 15px",
                  display: "flex",
                  alignItems: "center", 
                  gap: "5px"
                }}
              >
                <FaCloudSun /> Weather
              </Link>
            </li>
            
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive("/CropInfo") ? "active" : ""}`} 
                to="/CropInfo"
                style={{
                  fontWeight: "500",
                  color: isActive("/CropInfo") ? "#4B5320" : "#555",
                  borderBottom: isActive("/CropInfo") ? "2px solid #6B8E23" : "2px solid transparent",
                  margin: "0 5px",
                  padding: "8px 15px",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px"
                }}
              >
                <FaLeaf /> Crop Rates
              </Link>
            </li>
            
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive("/Advisory") ? "active" : ""}`} 
                to="/Advisory"
                style={{
                  fontWeight: "500",
                  color: isActive("/Advisory") ? "#4B5320" : "#555",
                  borderBottom: isActive("/Advisory") ? "2px solid #6B8E23" : "2px solid transparent",
                  margin: "0 5px",
                  padding: "8px 15px",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px"
                }}
              >
                <FaBook /> Advisory
              </Link>
            </li>
            
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive("/Schemes") ? "active" : ""}`} 
                to="/Schemes"
                style={{
                  fontWeight: "500",
                  color: isActive("/Schemes") ? "#4B5320" : "#555",
                  borderBottom: isActive("/Schemes") ? "2px solid #6B8E23" : "2px solid transparent",
                  margin: "0 5px",
                  padding: "8px 15px",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px"
                }}
              >
                <FaHandHoldingUsd /> Schemes
              </Link>
            </li>
            
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive("/About") ? "active" : ""}`} 
                to="/About"
                style={{
                  fontWeight: "500",
                  color: isActive("/About") ? "#4B5320" : "#555",
                  borderBottom: isActive("/About") ? "2px solid #6B8E23" : "2px solid transparent",
                  margin: "0 5px",
                  padding: "8px 15px",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px"
                }}
              >
                <FaInfoCircle /> About
              </Link>
            </li>
            
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive("/Contact") ? "active" : ""}`} 
                to="/Contact"
                style={{
                  fontWeight: "500",
                  color: isActive("/Contact") ? "#4B5320" : "#555",
                  borderBottom: isActive("/Contact") ? "2px solid #6B8E23" : "2px solid transparent",
                  margin: "0 5px",
                  padding: "8px 15px",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px"
                }}
              >
                <FaPhoneAlt /> Contact
              </Link>
            </li>
          </ul>

          {/* Show Login & Signup if NOT logged in, else show Logout */}
          <div className="d-flex gap-2">
            {!token ? (
              <>
                <Link
                  to="/login"
                  className="btn"
                  style={{ 
                    backgroundColor: "#6B8E23", 
                    color: "white", 
                    fontWeight: "600",
                    padding: "8px 20px",
                    borderRadius: "6px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    transition: "all 0.2s ease"
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = "#5A7D12"}
                  onMouseOut={(e) => e.target.style.backgroundColor = "#6B8E23"}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="btn"
                  style={{ 
                    backgroundColor: "#4B5320", 
                    color: "white", 
                    fontWeight: "600",
                    padding: "8px 20px",
                    borderRadius: "6px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    transition: "all 0.2s ease"
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = "#3A420F"}
                  onMouseOut={(e) => e.target.style.backgroundColor = "#4B5320"}
                >
                  Signup
                </Link>
              </>
            ) : (
              <button
                className="btn"
                style={{ 
                  backgroundColor: "#FF5722", 
                  color: "white", 
                  fontWeight: "600",
                  padding: "8px 20px",
                  borderRadius: "6px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.2s ease"
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = "#E64A19"}
                onMouseOut={(e) => e.target.style.backgroundColor = "#FF5722"}
                onClick={handleLogout}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
