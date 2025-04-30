import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaHome, FaCloudSun, FaLeaf, FaBook,
  FaHandHoldingUsd, FaInfoCircle,FaSeedling, FaPhoneAlt, FaUserCircle,
  FaSignOutAlt, FaUser, FaEnvelope
} from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("userType");
  const name = localStorage.getItem("username");
  const email = localStorage.getItem("email");
  console.log(name);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setMenuOpen(false);
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  const navItemStyle = (path) => ({
    fontWeight: "500",
    color: isActive(path) ? "#4B5320" : "#555",
    borderBottom: isActive(path) ? "2px solid #6B8E23" : "2px solid transparent",
    margin: "0 5px",
    padding: "8px 15px",
    display: "flex",
    alignItems: "center",
    gap: "5px"
  });

  return (
    <nav
      className={`navbar navbar-expand-lg sticky-top ${scrolled ? 'scrolled' : ''}`}
      style={{
        background: scrolled ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.85)",
        boxShadow: scrolled ? "0 5px 15px rgba(0,0,0,0.08)" : "0 2px 10px rgba(0,0,0,0.05)",
        backdropFilter: "blur(10px)",
        transition: "all 0.3s ease",
        padding: "10px 0"
      }}
    >
      <div className="container">
        {/* Logo & Brand */}
        <Link to="/" className="navbar-brand d-flex align-items-center gap-2" style={{ fontSize: "1.5rem", fontWeight: "700", color: "#4B5320" }}>
          <img src="/logo.png" alt="Agro Seva" style={{ height: "32px" }} onError={e => e.target.style.display = 'none'} />
          Agro Seva
        </Link>

        {/* Toggler */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav Links */}
        <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className={`nav-link ${isActive("/") ? "active" : ""}`} style={navItemStyle("/")}>
                <FaHome /> Home
              </Link>
            </li>
            
            {role !== "advisory" && (
              <li className="nav-item">
                <Link to="/WeatherUpdate" className="nav-link" style={navItemStyle("/WeatherUpdate")}>
                  <FaCloudSun /> Weather
                </Link>
              </li>
            )}
            
            {role !== "advisory" && (
            <li className="nav-item">
              <Link to="/CropInfo" className="nav-link" style={navItemStyle("/CropInfo")}>
                <FaLeaf /> Crop Rates
              </Link>
            </li>
            )}

            <li className="nav-item">
            <a href="/Advisory" className="nav-link" style={navItemStyle("/Advisory")}>
              <FaBook /> Advisory
            </a>

            </li>
            
            {role !== "advisory" && (
            <li className="nav-item">
              <Link to="/Schemes" className="nav-link" style={navItemStyle("/Schemes")}>
                <FaHandHoldingUsd /> Schemes
              </Link>
            </li>
            )}
            {role !== "advisory" && (
            <li className="nav-item">
              <Link  to="/crop-recommendation" className="nav-link"  style={navItemStyle("/crop-recommendation")}>
                <FaSeedling /> Crop Predictor
              </Link>
            </li>
            )}

            <li className="nav-item">
              <Link to="/About" className="nav-link" style={navItemStyle("/About")}>
                <FaInfoCircle /> About
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/Contact" className="nav-link" style={navItemStyle("/Contact")}>
                <FaPhoneAlt /> Contact
              </Link>
            </li>
          </ul>

          {/* Auth Buttons or Profile */}
          <div className="d-flex align-items-center" ref={menuRef}>
            {!token ? (
              <>
                <Link to="/login" className="btn btn-success me-2">Login</Link>
                <Link to="/signup" className="btn btn-outline-success">Signup</Link>
              </>
            ) : (
              <div className="position-relative">
                <button
                  className="btn btn-outline-success d-flex align-items-center gap-2"
                  onClick={() => setMenuOpen(prev => !prev)}
                  style={{
                    borderRadius: "20px",
                    padding: "8px 16px",
                    transition: "all 0.3s ease"
                  }}
                >
                  <FaUserCircle size={20} />
                  <span style={{ maxWidth: "150px", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {name}
                  </span>
                </button>
                {menuOpen && (
                  <div
                    className="dropdown-menu show"
                    style={{
                      position: "absolute",
                      top: "calc(100% + 5px)",
                      right: 0,
                      zIndex: 1000,
                      minWidth: "180px",
                      backgroundColor: "#fff",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      borderRadius: "8px",
                      border: "1px solid rgba(0,0,0,0.1)",
                      padding: "8px 0"
                    }}
                  >
                    <button 
                      className="dropdown-item d-flex align-items-center gap-2 text-danger" 
                      onClick={handleLogout}
                      style={{
                        padding: "8px 16px",
                        transition: "background-color 0.2s"
                      }}
                    >
                      <FaSignOutAlt />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
