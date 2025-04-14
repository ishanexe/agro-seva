import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top" 
     style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)" }}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/"><b>Agro Seva</b></Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><Link className="nav-link active" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/WeatherUpdate">Weather</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/CropInfo">Crop Rates</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/Advisory">Advisory</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/Schemes">Schemes</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/About">About</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/Contact">Contact</Link></li>
          </ul>

          {/* Show Login & Signup if NOT logged in, else show Logout */}
          {!token ? (
            <div>
              <Link
                to="/login"
                className="btn me-2"
                style={{ backgroundColor: "#027dff", color: "white", fontWeight: "bold" }}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="btn"
                style={{ backgroundColor: "#027dff", color: "white", fontWeight: "bold" }}
              >
                Signup
              </Link>
            </div>
          ) : (
            <button
              className="btn btn-sm btn-small"
              style={{ 
                backgroundColor: "#f94449", 
                color: "white", 
                fontWeight: "bold"
              }}
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
