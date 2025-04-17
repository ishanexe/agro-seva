import React, { useState, useEffect } from "react";
import axios from "axios";

const Schemes = () => {
    const [schemes, setSchemes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [popup, setPopup] = useState({ show: false, message: "", title: "" });

    useEffect(() => {
        fetchSchemes();
    }, []);

    const fetchSchemes = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:5000/api/schemes/getSchemes");
            
            // Generate random dates for each scheme
            const dates = [
                "December 31, 2023",
                "January 15, 2024",
                "March 31, 2024",
                "June 30, 2024",
                "September 15, 2024"
            ];
            
            const cleanedSchemes = response.data.map((scheme, index) => ({
                ...scheme,
                title: scheme.title.replace(/\s+/g, ' ').trim(),
                requested: false,
                expiryDate: dates[index % dates.length] // Assign a date from the array
            }));
            setSchemes(cleanedSchemes);
        } catch (err) {
            setError("Failed to fetch schemes.");
        } finally {
            setLoading(false);
        }
    };

    const handleRequestClick = (index) => {
        const scheme = schemes[index];
        setSchemes(prevSchemes =>
            prevSchemes.map((scheme, i) =>
                i === index ? { ...scheme, requested: !scheme.requested } : scheme
            )
        );
        
        // Show popup
        if (!scheme.requested) {
            setPopup({
                show: true,
                message: `Your application for "${scheme.title}" has been submitted. Our team will contact you shortly with next steps.`,
                title: "Application Received!"
            });
        } else {
            setPopup({
                show: true,
                message: `Your request for "${scheme.title}" has been withdrawn.`,
                title: "Request Withdrawn"
            });
        }
    };

    const closePopup = () => {
        setPopup({ ...popup, show: false });
    };

    // Get a random badge for each scheme
    const getBadge = (index) => {
        const badges = ["New", "Popular", "Limited Time", "Recommended", ""];
        return badges[index % badges.length];
    };

    return (
        <div style={{ 
            backgroundColor: "#FAEBCD", 
            minHeight: "100vh", 
            padding: "30px 20px",
            fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif"
        }}>
            {/* Popup message */}
            {popup.show && (
                <div style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 1000,
                    backdropFilter: "blur(3px)"
                }}>
                    <div style={{
                        backgroundColor: "white",
                        padding: "30px",
                        borderRadius: "16px",
                        maxWidth: "500px",
                        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
                        position: "relative"
                    }}>
                        <h3 style={{ 
                            color: "#4B5320", 
                            marginBottom: "15px", 
                            fontSize: "1.4rem",
                            fontWeight: "600"
                        }}>
                            {popup.title}
                        </h3>
                        <p style={{ 
                            marginBottom: "25px", 
                            color: "#555",
                            lineHeight: "1.6" 
                        }}>
                            {popup.message}
                        </p>
                        <button 
                            onClick={closePopup}
                            style={{
                                backgroundColor: "#6B8E23",
                                color: "white",
                                border: "none",
                                padding: "10px 24px",
                                borderRadius: "8px",
                                cursor: "pointer",
                                fontWeight: "600",
                                fontSize: "15px",
                                transition: "all 0.2s ease"
                            }}
                            onMouseOver={(e) => e.target.style.backgroundColor = "#5A7D12"}
                            onMouseOut={(e) => e.target.style.backgroundColor = "#6B8E23"}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            <div style={{ maxWidth: "900px", margin: "auto", padding: "20px" }}>
                <h2 style={{ 
                    textAlign: "center", 
                    marginBottom: "40px", 
                    color: "#4B5320",
                    fontSize: "2.2rem",
                    fontWeight: "700"
                }}>
                    Government Schemes
                </h2>
                
                {loading && (
                    <div style={{ 
                        textAlign: "center", 
                        padding: "40px", 
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                        borderRadius: "12px",
                        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.05)"
                    }}>
                        <div style={{ 
                            display: "inline-block", 
                            width: "40px", 
                            height: "40px", 
                            border: "4px solid rgba(75, 83, 32, 0.2)", 
                            borderTopColor: "#4B5320", 
                            borderRadius: "50%", 
                            animation: "spin 1s infinite linear" 
                        }}></div>
                        <p style={{ marginTop: "15px", color: "#4B5320", fontSize: "16px" }}>Loading schemes...</p>
                    </div>
                )}
                
                {error && (
                    <div style={{ 
                        color: "white", 
                        backgroundColor: "#D32F2F", 
                        padding: "15px 20px", 
                        borderRadius: "8px", 
                        marginBottom: "25px",
                        boxShadow: "0 4px 10px rgba(211, 47, 47, 0.3)"
                    }}>
                        {error}
                    </div>
                )}

                {schemes.length === 0 && !loading ? (
                    <div style={{ 
                        textAlign: "center", 
                        padding: "40px", 
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                        borderRadius: "12px",
                        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.05)"
                    }}>
                        <div style={{ fontSize: "3rem", marginBottom: "15px" }}>🌾</div>
                        <p style={{ color: "#666", fontSize: "17px" }}>
                            No schemes available at the moment.
                            <br />
                            Please check back later for new government initiatives.
                        </p>
                    </div>
                ) : (
                    <div>
                        {schemes.map((scheme, index) => {
                            const badge = getBadge(index);
                            
                            return (
                                <div key={index} style={{
                                    border: "none",
                                    borderRadius: "16px",
                                    padding: "30px",
                                    marginBottom: "25px",
                                    background: "white",
                                    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.06)",
                                    borderLeft: scheme.requested ? "5px solid #4CAF50" : "5px solid #6B8E23",
                                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                    position: "relative",
                                    overflow: "hidden"
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.transform = "translateY(-5px)";
                                    e.currentTarget.style.boxShadow = "0 12px 25px rgba(0, 0, 0, 0.1)";
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.transform = "translateY(0)";
                                    e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.06)";
                                }}>
                                    {badge && (
                                        <div style={{
                                            position: "absolute",
                                            top: "0",
                                            right: "0",
                                            backgroundColor: "#EF6C00",
                                            color: "white",
                                            padding: "6px 12px",
                                            fontSize: "12px",
                                            fontWeight: "bold",
                                            borderBottomLeftRadius: "10px"
                                        }}>
                                            {badge}
                                        </div>
                                    )}

                                    <h3 style={{ 
                                        color: "#4B5320", 
                                        fontWeight: "600", 
                                        marginBottom: "15px",
                                        fontSize: "1.4rem" 
                                    }}>
                                        {scheme.title}
                                    </h3>
                                    
                                    <p style={{ 
                                        marginBottom: "25px",
                                        color: "#555",
                                        lineHeight: "1.7",
                                        fontSize: "1rem"
                                    }}>
                                        {scheme.description}
                                    </p>
                                    
                                    <div style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        borderTop: "1px solid #eee",
                                        paddingTop: "20px",
                                        marginTop: "10px"
                                    }}>
                                        <div>
                                            <div style={{ 
                                                fontSize: "0.9rem", 
                                                color: "#777",
                                                marginBottom: "4px"
                                            }}>
                                                Application Deadline
                                            </div>
                                            <div style={{
                                                fontSize: "1.1rem",
                                                color: "#4B5320",
                                                fontWeight: "600"
                                            }}>
                                                {scheme.expiryDate}
                                            </div>
                                        </div>
                                        
                                        <button
                                            onClick={() => handleRequestClick(index)}
                                            style={{
                                                backgroundColor: scheme.requested ? "#FF5722" : "#6B8E23",
                                                color: "white",
                                                padding: "12px 20px",
                                                border: "none",
                                                borderRadius: "8px",
                                                cursor: "pointer",
                                                fontWeight: "600",
                                                fontSize: "15px",
                                                transition: "all 0.2s ease",
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "8px"
                                            }}
                                            onMouseOver={(e) => e.target.style.backgroundColor = scheme.requested ? "#E64A19" : "#5A7D12"}
                                            onMouseOut={(e) => e.target.style.backgroundColor = scheme.requested ? "#FF5722" : "#6B8E23"}
                                        >
                                            {scheme.requested ? (
                                                "Withdraw Application"
                                            ) : (
                                                <>
                                                    Apply for Scheme
                                                    <span style={{ fontSize: "18px" }}>→</span>
                                                </>
                                            )}
                                        </button>
                                    </div>

                                    {scheme.requested && (
                                        <div style={{
                                            backgroundColor: "rgba(76, 175, 80, 0.1)",
                                            padding: "12px 15px",
                                            borderRadius: "8px",
                                            marginTop: "20px",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "10px"
                                        }}>
                                            <span style={{ 
                                                color: "#4CAF50", 
                                                fontSize: "1.2rem",
                                                fontWeight: "bold"
                                            }}>✓</span>
                                            <span style={{ color: "#4B5320" }}>
                                                Your application has been submitted. Our team will review and contact you soon.
                                            </span>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
            <style jsx>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default Schemes;
