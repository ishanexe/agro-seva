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
    <div
      style={{
        display: "flex",
        flexDirection: "column", // Stack items vertically
        maxWidth: "900px",
        margin: "auto",
        padding: "20px",
        animation: "fadeIn 1s ease-in-out",
        gap: "1px",
      }}
    >
      {/* Submission Box */}
      <div
        style={{
          padding: "20px",
          textAlign: "center",
          border: "1px solid #8B4513",
          borderRadius: "10px",
          backgroundColor: "#F5DEB3",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          transition: "transform 0.3s",
          height: "280px",
          overflow: "hidden",
        }}
      >
        <h2 style={{ color: "#6B4226" }}>Submit an Advisory</h2>
        <input
          type="text"
          placeholder="Your Name"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          style={{
            padding: "10px",
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
            padding: "10px",
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
            transition: "background 0.3s",
            fontWeight: "bold",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#1C6B1C")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#228B22")}
        >
          Submit
        </button>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>

      {/* Advisories List */}
      <div
        style={{
          padding: "20px",
          overflowY: "auto",
          backgroundColor: "#FAF3E0",
          borderRadius: "10px",
          border: "1px solid #8B4513",
          transition: "transform 0.3s",
          marginTop: "40px", // Moves it downward
          height: "400px", // Increases the length
        }}
      >
        <h3 style={{ color: "#6B4226" }}>Recent Advisories</h3>
        {advisories.length === 0 ? (
          <p>No advisories yet.</p>
        ) : (
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {(showAll ? advisories : advisories.slice(0, 4)).map((adv, index) => (
              <li
                key={index}
                style={{
                  background: "#FFF8DC",
                  margin: "10px 8px",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #8B4513",
                  transition: "transform 0.3s",
                }}
                onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
                onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
              >
                <strong style={{ color: "#228B22" }}>{adv.user}</strong>: {adv.advisory}
              </li>
            ))}
          </ul>
        )}

        {/* Show All / Show Less Button */}
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
              transition: "background 0.3s",
              fontWeight: "bold",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#6B4226")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#8B4513")}
          >
            {showAll ? "Show Less" : "Show All Advisories"}
          </button>
        )}
      </div>
    </div>
  );
};

export default AdvisoryForm;
