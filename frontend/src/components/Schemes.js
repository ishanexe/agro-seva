import React, { useState, useEffect } from "react";
import axios from "axios";

const Schemes = () => {
    const [schemes, setSchemes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchSchemes();
    }, []);

    const fetchSchemes = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:5000/api/schemes/getSchemes");
            const cleanedSchemes = response.data.map(scheme => ({
                ...scheme,
                title: scheme.title.replace(/\s+/g, ' ').trim(),
                requested: false // add a flag to track button click
            }));
            setSchemes(cleanedSchemes);
        } catch (err) {
            setError("Failed to fetch schemes.");
        } finally {
            setLoading(false);
        }
    };

    const handleRequestClick = (index) => {
        setSchemes(prevSchemes =>
            prevSchemes.map((scheme, i) =>
                i === index ? { ...scheme, requested: !scheme.requested } : scheme
            )
        );
    };

    return (
        <div style={{ backgroundColor: "#FAEBCD", minHeight: "100vh", padding: "20px" }}>
            <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
                <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Available Schemes</h2>
                {loading && <p>Loading...</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}

                {schemes.length === 0 ? <p>No schemes available.</p> : (
                    <div>
                        {schemes.map((scheme, index) => (
                            <div key={index} style={{
                                border: "1px solid #ddd",
                                borderRadius: "8px",
                                padding: "20px",
                                marginBottom: "20px",
                                background: "#f9f9f9"
                            }}>
                                <h3 style={{ color: "black", fontWeight: "bold", marginBottom: "10px" }}>{scheme.title}</h3>
                                <p style={{ marginBottom: "15px" }}>{scheme.description}</p>
                                <button
                                    onClick={() => handleRequestClick(index)}
                                    style={{
                                        backgroundColor: scheme.requested ? "red" : "green",
                                        color: "white",
                                        padding: "5px 10px",
                                        border: "none",
                                        borderRadius: "5px",
                                        cursor: "pointer"
                                    }}
                                >
                                    {scheme.requested ? "Requested" : "Request Scheme"}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Schemes;
