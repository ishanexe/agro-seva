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
      const response = await axios.get("http://192.168.1.7:5000/api/advisory/getAll");
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
      await axios.post("http://192.168.1.7:5000/api/advisory/add", { user, advisory });
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
    <div style={{ maxWidth: "900px", margin: "auto", padding: "20px", backgroundColor: "#f7f7f7", color: "#333" }}>
      <div
        style={{
          padding: "25px",
          border: "2px solid #eee",
          borderRadius: "10px",
          backgroundColor: "#fff",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 style={{ color: "#333", textAlign: "center" }}>Advisory Section</h2>

        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Your Name"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            style={{
              padding: "10px",
              width: "100%",
              marginBottom: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              backgroundColor: "#fafafa",
              color: "#333",
            }}
          />
          <textarea
            placeholder="Write your advisory here..."
            value={advisory}
            onChange={(e) => setAdvisory(e.target.value)}
            style={{
              padding: "10px",
              width: "100%",
              marginBottom: "10px",
              height: "80px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              backgroundColor: "#fafafa",
              color: "#333",
            }}
          ></textarea>
          <br />
          <button
            onClick={submitAdvisory}
            style={{
              padding: "12px 25px",
              backgroundColor: "#4CAF50",
              color: "#fff",
              border: "2px solid #4CAF50",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Submit
          </button>
          {loading && <p>Loading...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>

        <div>
          {advisories.length === 0 ? (
            <p>No advisories yet.</p>
          ) : (
            <div>
              {advisories.map((adv, index) => (
                <div
                  key={index}
                  style={{
                    border: "1px solid #ddd",
                    padding: "15px",
                    marginBottom: "15px",
                    borderRadius: "5px",
                    backgroundColor: "#f9f9f9",
                    color: "#333",
                  }}
                >
                  <p><strong>{adv.user}</strong></p>
                  <p>{adv.advisory}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdvisoryForm;
