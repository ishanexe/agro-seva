import React from 'react';
import { motion } from 'framer-motion';
import { FaSeedling } from 'react-icons/fa';

const CropRecommendation = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ backgroundColor: "#FAEBCD", minHeight: "100vh", padding: "20px" }}
    >
      <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ 
            textAlign: "center", 
            marginBottom: "30px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px"
          }}
        >
          <FaSeedling size={40} color="#066b06" />
          <h2 style={{ color: "#121111" }}>Smart Crop Predictor</h2>
          <p style={{ color: "#555", fontSize: "1.1rem" }}>
            Click below to use our advanced crop recommendation system
          </p>
          
          <motion.a
            href="https://crop-recommendation-2-agro-seva.onrender.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              marginTop: "20px",
              padding: "15px 40px",
              backgroundColor: "#066b06",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "18px",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              textDecoration: "none"
            }}
          >
            <FaSeedling size={24} />
            Predict Your Crop
          </motion.a>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CropRecommendation; 