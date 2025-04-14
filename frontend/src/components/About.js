import React from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate("/");
    };

    return (
        <div
            style={{
                backgroundColor: "#FAEBCD",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "40px 20px",
                textAlign: "center",
            }}
        >
            <div>
                <h2 style={{ fontSize: "36px", fontWeight: "bold", color: "#4B5320", marginBottom: "20px" }}>
                    About Us
                </h2>
                <p style={{ fontSize: "18px", color: "#333", maxWidth: "800px", margin: "auto", lineHeight: "1.6" }}>
                    Welcome to <strong>Agro Seva</strong>, a platform dedicated to empowering farmers by providing real-time weather updates, 
                    crop price insights, government schemes, and an advisory system to help make informed decisions.
                </p>

                <h3 style={{ fontSize: "26px", marginTop: "40px", fontWeight: "bold", color: "#6B8E23" }}>
                    Our Mission
                </h3>
                <p style={{ fontSize: "18px", color: "#333", maxWidth: "800px", margin: "auto", lineHeight: "1.6" }}>
                    Our goal is to bridge the gap between technology and agriculture by delivering essential 
                    data and advisory services directly to farmers in a user-friendly way.
                </p>

                <h3 style={{ fontSize: "26px", marginTop: "40px", fontWeight: "bold", color: "#6B8E23" }}>
                    Why Choose Us?
                </h3>
                <div style={{ display: "inline-block", textAlign: "left", marginTop: "20px", fontSize: "18px", color: "#444", lineHeight: "2" }}>
                    <p>✅ Accurate Weather Forecasts</p>
                    <p>✅ Latest Crop Price Updates</p>
                    <p>✅ Government Schemes & Benefits</p>
                    <p>✅ Expert Advisory Support</p>
                    <p>✅ Crop Recommendation System</p>
                </div>
            </div>

            <button
                onClick={handleGetStarted}
                style={{
                    marginTop: "40px",
                    backgroundColor: "#6B8E23",
                    color: "#fff",
                    border: "none",
                    padding: "12px 30px",
                    borderRadius: "6px",
                    fontSize: "18px",
                    cursor: "pointer",
                    alignSelf: "center",
                    transition: "background-color 0.3s ease"
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#556B2F")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#6B8E23")}
            >
                Get Started
            </button>
        </div>
    );
};

export default About;
