import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./Auth.css";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "advisory",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  let isMounted = true;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Simple client-side validation
    if (!formData.name || !formData.email || !formData.password) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        formData
      );
      
      if (response.data) {
        setSuccess("Account created successfully! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 2000); // Redirect after 2 seconds
      }
    } catch (err) {
      if (isMounted) {
        const errorMessage =
          err.response?.data?.msg || "An error occurred during signup.";
        setError(errorMessage);
      }
    } finally {
      if (isMounted) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="auth-page-container">
      <div className="auth-background">
        <div className="wheat-pattern"></div>
        <div className="auth-overlay"></div>
      </div>

      <motion.div
        className="auth-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="auth-box"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="auth-logo">
            <img src="/agro-seva.png" alt="Agro Seva" width="60" />
          </div>

          <motion.h2
            className="auth-title"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Create Account
          </motion.h2>

          <motion.p
            className="auth-subtitle"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Join Agro Seva today
          </motion.p>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="input-group">
              <label htmlFor="name">Full Name</label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="email">Email</label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="role">I am a</label>
              <motion.select
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="select-input"
              >
                <option value="advisory">Advisory</option>
                <option value="farmer">Farmer</option>
                {/* <option value="admin">Admin</option> */}
              </motion.select>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                borderRadius: "8px",
                color: "white",
                padding: "10px 20px",
                border: "none",
              }}
            >
              {loading ? <div className="spinner"></div> : "Create Account"}
            </motion.button>

            {error && (
              <motion.div
                className="auth-error"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {error}
              </motion.div>
            )}

            {success && (
              <motion.div
                className="auth-success"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  backgroundColor: "#4CAF50",
                  color: "white",
                  padding: "10px",
                  borderRadius: "4px",
                  marginTop: "10px",
                  textAlign: "center"
                }}
              >
                {success}
              </motion.div>
            )}
          </motion.form>

          <div className="auth-footer">
            <p>
              Already have an account? <a href="/login">Log In</a>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Signup;