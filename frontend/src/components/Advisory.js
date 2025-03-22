import React, { useState, useEffect } from "react";
import axios from "axios";

const AdvisoryForm = () => {
  const [user, setUser] = useState("");
  const [advisory, setAdvisory] = useState("");
  const [advisories, setAdvisories] = useState([]);
  const [showAll, setShowAll] = useState(false);
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
    <div style={{ maxWidth: "900px", margin: "auto", padding: "15px" }}>
      <div
        style={{
          padding: "20px",
          border: "1px solid #8B4513",
          borderRadius: "10px",
          backgroundColor: "#F5DEB3",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 style={{ color: "#6B4226", textAlign: "center" }}>Advisory Section</h2>

        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Your Name"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            style={{
              padding: "8px",
              width: "100%",
              marginBottom: "10px",
              border: "1px solid #8B4513",
              borderRadius: "5px",
            }}
          />
          <textarea
            placeholder="Write your advisory here..."
            value={advisory}
            onChange={(e) => setAdvisory(e.target.value)}
            style={{
              padding: "8px",
              width: "100%",
              marginBottom: "10px",
              height: "60px",
              border: "1px solid #8B4513",
              borderRadius: "5px",
            }}
          ></textarea>
          <br />
          <button
            onClick={submitAdvisory}
            style={{
              padding: "10px 20px",
              backgroundColor: "#228B22",
              color: "white",
              border: "none",
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

        <div
          style={{
            padding: "10px",
            backgroundColor: "#FAF3E0",
            borderRadius: "5px",
            border: "1px solid #8B4513",
            height: "300px",
            overflowY: "auto",
          }}
        >
          <h3 style={{ color: "#6B4226" }}>Recent Advisories</h3>
          {advisories.length === 0 ? (
            <p>No advisories yet.</p>
          ) : (
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {(showAll ? advisories : advisories.slice(0, 2)).map((adv, index) => (
                <li
                  key={index}
                  style={{
                    background: "#FFF8DC",
                    margin: "10px 12px",
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #8B4513",
                  }}
                >
                  <strong style={{ color: "#228B22" }}>{adv.user}</strong>: {adv.advisory}
                </li>
              ))}
            </ul>
          )}

          {advisories.length > 5 && (
            <button
              onClick={() => setShowAll(!showAll)}
              style={{
                marginTop: "10px",
                padding: "8px 15px",
                backgroundColor: "#8B4513",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              {showAll ? "Show Less" : "Show All Advisories"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdvisoryForm;
