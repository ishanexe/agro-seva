import React from "react";

const About = () => {
    return (
        <div style={{ maxWidth: "800px", margin: "auto", padding: "20px", textAlign: "center" }}>
            <h2 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "10px" }}>About Us</h2>
            <p style={{ fontSize: "16px", color: "#555" }}>
                Welcome to **Agro Seva**, a platform dedicated to empowering farmers by providing real-time weather updates, 
                crop price insights, government schemes, and an advisory system to help make informed decisions.
            </p>
            <h3 style={{ fontSize: "22px", marginTop: "20px", fontWeight: "bold" }}>Our Mission</h3>
            <p style={{ fontSize: "16px", color: "#555" }}>
                Our goal is to bridge the gap between technology and agriculture by delivering essential 
                data and advisory services directly to farmers in a user-friendly way.
            </p>
            <h3 style={{ fontSize: "22px", marginTop: "20px", fontWeight: "bold" }}>Why Choose Us?</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
                <li>✅ Accurate Weather Forecasts</li>
                <li>✅ Latest Crop Price Updates</li>
                <li>✅ Government Schemes & Benefits</li>
                <li>✅ Expert Advisory Support</li>
            </ul>
        </div>
    );
};

export default About;
