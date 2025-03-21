import React, { useState, useEffect } from "react";
import axios from "axios";

const AdvisoryForm = () => {
    const [user, setUser] = useState("");
    const [advisory, setAdvisory] = useState("");
    const [advisories, setAdvisories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchAdvisories();
    }, []);

    const fetchAdvisories = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:5000/api/advisory/getAll");
            setAdvisories(response.data);
        } catch (err) {
            setError("Failed to fetch advisories.");
        } finally {
            setLoading(false);
        }
    };

    const submitAdvisory = async () => {
        if (!user || !advisory) {
            setError("Please enter both name and advisory.");
            return;
        }
        setLoading(true);
        setError("");

        try {
            await axios.post("http://localhost:5000/api/advisory/add", { user, advisory });
            setUser("");
            setAdvisory("");
            fetchAdvisories();
        } catch (err) {
            setError("Failed to submit advisory.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: "flex", maxWidth: "900px", margin: "auto", padding: "20px" }}>
            <div style={{ flex: 1, padding: "20px", textAlign: "center", border: "1px solid #ddd", borderRadius: "10px" }}>
                <h2>Submit an Advisory</h2>
                <input
                    type="text"
                    placeholder="Your Name"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    style={{ padding: "10px", width: "100%", marginBottom: "10px" }}
                />
                <textarea
                    placeholder="Write your advisory here..."
                    value={advisory}
                    onChange={(e) => setAdvisory(e.target.value)}
                    style={{ padding: "10px", width: "100%", marginBottom: "10px", height: "100px" }}
                ></textarea>
                <br />
                <button onClick={submitAdvisory} style={{ padding: "10px 20px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
                    Submit
                </button>
                {loading && <p>Loading...</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
            <div style={{ flex: 1, padding: "20px", overflowY: "auto" }}>
                <h3>Recent Advisories</h3>
                {advisories.length === 0 ? <p>No advisories yet.</p> : (
                    <ul style={{ listStyleType: "none", padding: 0 }}>
                        {advisories.map((adv, index) => (
                            <li key={index} style={{ background: "#f8f9fa", margin: "10px 0", padding: "10px", borderRadius: "5px" }}>
                                <strong>{adv.user}</strong>: {adv.advisory}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default AdvisoryForm;
