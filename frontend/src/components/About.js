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
                <div style={{ display: "inline-block", textAlign: "left", marginTop: "10px", fontSize: "18px", color: "#444", lineHeight: "1" }}>
                    <p>✅ Accurate Weather Forecasts</p>
                    <p>✅ Latest Crop Price Updates</p>
                    <p>✅ Government Schemes & Benefits</p>
                    <p>✅ Expert Advisory Support</p>
                    <p>✅ Crop Recommendation System</p>
                </div>

                <h3 style={{ fontSize: "26px", marginTop: "40px", fontWeight: "bold", color: "#6B8E23" }}>
                    Our Grades
                </h3>
                <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "20px", marginTop: "20px" }}>
                    <div style={{ 
                        backgroundColor: "#fff", 
                        padding: "15px", 
                        borderRadius: "10px", 
                        width: "160px",
                        boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
                    }}>
                        <div style={{ fontSize: "42px", fontWeight: "bold", color: "#4CAF50" }}>A+</div>
                        <div style={{ fontSize: "16px", color: "#555" }}>Weather Accuracy</div>
                    </div>
                    <div style={{ 
                        backgroundColor: "#fff", 
                        padding: "15px", 
                        borderRadius: "10px", 
                        width: "160px",
                        boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
                    }}>
                        <div style={{ fontSize: "42px", fontWeight: "bold", color: "#4CAF50" }}>A</div>
                        <div style={{ fontSize: "16px", color: "#555" }}>Market Price Updates</div>
                    </div>
                    <div style={{ 
                        backgroundColor: "#fff", 
                        padding: "15px", 
                        borderRadius: "10px", 
                        width: "160px",
                        boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
                    }}>
                        <div style={{ fontSize: "42px", fontWeight: "bold", color: "#4CAF50" }}>A</div>
                        <div style={{ fontSize: "16px", color: "#555" }}>User Satisfaction</div>
                    </div>
                    <div style={{ 
                        backgroundColor: "#fff", 
                        padding: "15px", 
                        borderRadius: "10px", 
                        width: "160px",
                        boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
                    }}>
                        <div style={{ fontSize: "42px", fontWeight: "bold", color: "#4CAF50" }}>B+</div>
                        <div style={{ fontSize: "16px", color: "#555" }}>Advisory Quality</div>
                    </div>
                </div>
            </div>

            <button
                onClick={handleGetStarted}
                style={{
                    marginTop: "20px",
                    backgroundColor: "#6B8E23",
                    color: "#fff",
                    border: "none",
                    padding: "10px 40px",
                    borderRadius: "30px",
                    fontSize: "16px",
                    fontWeight: "500",
                    cursor: "pointer",
                    width: "170px",
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
