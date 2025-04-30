import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

// Simulate admin role (replace with real logic if needed)
const isAdmin = true;

const AdvisoryForm = () => {
  const [user, setUser] = useState("");
  const [advisory, setAdvisory] = useState("");
  const [advisories, setAdvisories] = useState([]);
  const [showAll, setShowAll] = useState(false); // Show only two by default
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editId, setEditId] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const listRef = useRef(null);
  const role = localStorage.getItem("userType");
  const currentUserId = localStorage.getItem("userId"); // Add this to track current user

  useEffect(() => {
    fetchAdvisories();
  }, []);

  const fetchAdvisories = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/advisory/getAll");
      // Sort by newest first
      const sorted = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setAdvisories(sorted);
    } catch (err) {
      setError("Failed to fetch advisories.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!user || !advisory) {
      setError("Please enter both name and advisory.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/advisory/update/${editId}`, {
          user,
          advisory
        });
        setEditId(null);
      } else {
        await axios.post("http://localhost:5000/api/advisory/add", { user, advisory });
      }

      await fetchAdvisories();
      setUser("");
      setAdvisory("");
    } catch (err) {
      setError("Failed to submit advisory.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (adv) => {
    setUser(adv.user);
    setAdvisory(adv.advisory);
    setEditId(adv._id);
    // Scroll to the form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (deleteConfirm !== id) {
      setDeleteConfirm(id);
      return;
    }
    
    setLoading(true);
    try {
      await axios.delete(`http://localhost:5000/api/advisory/delete/${id}`);
      await fetchAdvisories();
      setDeleteConfirm(null);
    } catch (err) {
      setError("Failed to delete advisory.");
    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    setUser("");
    setAdvisory("");
    setEditId(null);
  };

  const cancelDelete = () => {
    setDeleteConfirm(null);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ backgroundColor: "#FAEBCD", minHeight: "100vh", padding: "20px" }}
    >
      <div style={{ maxWidth: "900px", margin: "auto", padding: "15px" }}>
      {role !== 'farmer' && role !== 'admin' && (
  <>
    <motion.h2 
      initial={{ y: -20 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ color: "#121111", textAlign: "center", marginBottom: "20px" }}
    >
      {editId ? "Edit Advisory" : "Share Your Advisory"}
    </motion.h2>

    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      style={{ 
        marginBottom: "30px", 
        background: "#fff", 
        padding: "20px", 
        borderRadius: "10px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
      }}
    >
      <motion.input
        whileFocus={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        type="text"
        placeholder="Your Name"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        style={{
          padding: "12px",
          width: "100%",
          marginBottom: "15px",
          border: "2px solid #8B4513",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        }}
      />
      <motion.textarea
        whileFocus={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        placeholder="Write your advisory here..."
        value={advisory}
        onChange={(e) => setAdvisory(e.target.value)}
        style={{
          padding: "12px",
          width: "100%",
          marginBottom: "15px",
          height: "100px",
          border: "2px solid #8B4513",
          borderRadius: "8px",
          resize: "vertical",
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        }}
      ></motion.textarea>
      <div style={{ display: "flex", gap: "10px" }}>
        <motion.button
          onClick={handleSubmit}
          whileHover={{ scale: 1.05, boxShadow: "0 4px 8px rgba(0,0,0,0.2)" }}
          whileTap={{ scale: 0.95 }}
          style={{
            padding: "12px 20px",
            width: "auto",
            maxWidth: "150px",
            backgroundColor: editId ? "#2a75bb" : "#066b06",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            transition: "all 0.3s ease",
          }}
        >
          {editId ? "Update" : "Submit"}
        </motion.button>
        
        {editId && (
          <motion.button
            onClick={cancelEdit}
            whileHover={{ scale: 1.05, boxShadow: "0 4px 8px rgba(0,0,0,0.2)" }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: "12px 20px",
              width: "auto",
              maxWidth: "120px",
              backgroundColor: "#6c757d",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              transition: "all 0.3s ease",
            }}
          >
            Cancel
          </motion.button>
        )}
      </div>
      {loading && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{ marginTop: "15px", color: "#066b06" }}
        >
          Loading...
        </motion.p>
      )}
      {error && (
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          style={{ marginTop: "15px", color: "red" }}
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  </>
)}


        <motion.h3 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ color: "#121111", marginBottom: "15px", fontSize: "1.5rem" }}
        >
          Recent Advisories
        </motion.h3>
        <motion.div
          ref={listRef}
          style={{
            maxHeight: "600px",
            overflowY: "auto",
            scrollBehavior: "smooth",
            padding: "10px 0",
          }}
        >
          {advisories.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ textAlign: "center", padding: "20px", color: "#555" }}
            >
              {role !== 'farmer' ? "No advisories yet. Be the first to share!" : "No advisories yet"}
            </motion.p>
          ) : (
            <ul style={{ listStyleType: "none", padding: 0 }}>
              <AnimatePresence>
                {(showAll ? advisories : advisories.slice(0, 2)).map((adv, index) => (
                  <motion.li
                    key={adv._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    style={{
                      background: "#FFF8DC",
                      margin: "15px 0",
                      padding: "20px",
                      borderRadius: "8px",
                      border: "2px solid #8B4513",
                      position: "relative",
                      boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
                    }}
                  >
                    <div style={{ marginBottom: "10px" }}>
                      <strong style={{ color: "#066b06", fontSize: "1.1rem" }}>{adv.user}</strong>
                      <p style={{ marginTop: "8px", lineHeight: "1.5" }}>{adv.advisory}</p>
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "#777", marginTop: "10px" }}>
                      {new Date(adv.createdAt).toLocaleString()}
                    </div>
                    
                    
                    {role !== 'farmer' && (
  <div style={{ 
    marginTop: "15px", 
    display: "flex", 
    gap: "10px",
    borderTop: "1px solid #e0e0e0",
    paddingTop: "15px"
  }}>
    {role === 'advisory' && (
      <motion.button 
        onClick={() => handleEdit(adv)} 
        whileHover={{ scale: 1.05, backgroundColor: "#0069d9" }}
        whileTap={{ scale: 0.95 }}
        style={{ 
          color: "#fff", 
          background: "#007bff", 
          border: "none", 
          padding: "8px 15px", 
          borderRadius: "5px",
          width: "75px",
          cursor: "pointer",
          fontWeight: "bold",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "5px",
          transition: "all 0.3s ease"
        }}
      >
        Edit
      </motion.button>
    )}

    {(role === 'admin' || role === 'advisory') && (
      <>
        {deleteConfirm === adv._id ? (
          <div style={{ display: 'flex', gap: '10px' }}>
            <motion.button 
              onClick={() => handleDelete(adv._id)} 
              whileHover={{ scale: 1.05, backgroundColor: "#c82333" }}
              whileTap={{ scale: 0.95 }}
              style={{ 
                color: "#fff", 
                background: "#dc3545", 
                border: "none", 
                padding: "8px 15px", 
                borderRadius: "5px",
                width: "90px",
                cursor: "pointer",
                fontWeight: "bold",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                transition: "all 0.3s ease"
              }}
            >
              Confirm
            </motion.button>
            <motion.button 
              onClick={cancelDelete} 
              whileHover={{ scale: 1.05, backgroundColor: "#5a6268" }}
              whileTap={{ scale: 0.95 }}
              style={{ 
                color: "#fff", 
                background: "#6c757d", 
                border: "none", 
                padding: "8px 15px", 
                borderRadius: "5px",
                width: "80px",
                cursor: "pointer",
                fontWeight: "bold",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                transition: "all 0.3s ease"
              }}
            >
              Cancel
            </motion.button>
          </div>
        ) : (
          <motion.button 
            onClick={() => setDeleteConfirm(adv._id)} 
            whileHover={{ scale: 1.05, backgroundColor: role === 'admin' ? "#c82333" : "#dc3545" }}
            whileTap={{ scale: 0.95 }}
            style={{ 
              color: "#fff", 
              background: role === 'admin' ? "#ff0000" : "#dc3545",
              border: "none", 
              padding: "8px 15px", 
              borderRadius: "5px",
              width: role === 'admin' ? "120px" : "90px",
              cursor: "pointer",
              fontWeight: "bold",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              transition: "all 0.3s ease"
            }}
          >
            {role === 'admin' ? "Admin Delete" : "Delete"}
          </motion.button>
        )}
      </>
    )}
  </div>
)}

                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          )}
        </motion.div>

        {advisories.length > 2 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            style={{ textAlign: "center", marginTop: "20px" }}
          >
            <motion.button
              onClick={() => setShowAll(!showAll)}
              whileHover={{ scale: 1.05, backgroundColor: showAll ? "#e85d04" : "#06a94d" }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: "10px 20px",
                backgroundColor: showAll ? "#ff7d00" : "#066b06",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
                width: "130px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                transition: "all 0.3s ease"
              }}
            >
              {showAll ? "Show Less" : "Show More"}
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default AdvisoryForm;
