import React, { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

import districtOptions from "../data/district_options.json";
import commodityOptions from "../data/commodity_options.json";

const CropPriceLookup = () => {
    const [district, setDistrict] = useState("");
    const [commodity, setCommodity] = useState("");
    const [prices, setPrices] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchPrices = async () => {
        if (!commodity || !district) {
            setError("Please select both commodity and district.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await axios.post("http://localhost:5000/api/crops/getPrices", {
                Commodity: commodity,
                District: district,
            });
            setPrices(response.data);
        } catch (err) {
            setError("Failed to fetch price data.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ 
                maxWidth: "600px", 
                margin: "40px auto", 
                padding: "25px", 
                backgroundColor: "#F5DEB3", 
                borderRadius: "15px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
            }}
        >
            <motion.h2 
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                style={{ 
                    textAlign: "center", 
                    marginBottom: "20px", 
                    color: "#5D4037",
                    fontSize: "28px",
                    fontWeight: "bold" 
                }}
            >
                🌾 Crop Price Lookup
            </motion.h2>
            
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                style={{ marginBottom: "15px" }}
            >
                <motion.select 
                    whileHover={{ scale: 1.02 }}
                    whileFocus={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    value={commodity} 
                    onChange={(e) => setCommodity(e.target.value)} 
                    style={{ 
                        padding: "12px", 
                        width: "100%", 
                        marginBottom: "15px",
                        borderRadius: "8px",
                        border: "2px solid #D7CCA3",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                        fontSize: "16px",
                        color: "#5D4037",
                        backgroundColor: "#FFF8DC",
                        cursor: "pointer",
                        transition: "all 0.3s ease"
                    }}
                >
                    <option value="">Select Commodity</option>
                    {commodityOptions.map((item, index) => (
                        <option key={index} value={item}>{item}</option>
                    ))}
                </motion.select>

                <motion.select 
                    whileHover={{ scale: 1.02 }}
                    whileFocus={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    value={district} 
                    onChange={(e) => setDistrict(e.target.value)} 
                    style={{ 
                        padding: "12px", 
                        width: "100%", 
                        marginBottom: "15px",
                        borderRadius: "8px",
                        border: "2px solid #D7CCA3",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                        fontSize: "16px",
                        color: "#5D4037",
                        backgroundColor: "#FFF8DC",
                        cursor: "pointer",
                        transition: "all 0.3s ease"
                    }}
                >
                    <option value="">Select District</option>
                    {districtOptions.map((item, index) => (
                        <option key={index} value={item}>{item}</option>
                    ))}
                </motion.select>
            </motion.div>
            
            <motion.button 
                onClick={fetchPrices} 
                whileHover={{ scale: 1.05, backgroundColor: "#066b06" }}
                whileTap={{ scale: 0.95 }}
                style={{ 
                    padding: "12px 20px", 
                    width: "100%",
                    border: "none", 
                    backgroundColor: "#2E7D32", 
                    color: "white", 
                    borderRadius: "8px", 
                    cursor: "pointer",
                    fontSize: "16px",
                    fontWeight: "bold",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    transition: "all 0.3s ease"
                }}
            >
                Get Prices
            </motion.button>
            
            <AnimatePresence>
                {loading && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ textAlign: "center", marginTop: "20px" }}
                    >
                        <div style={{ 
                            display: "inline-block", 
                            width: "30px", 
                            height: "30px", 
                            border: "3px solid rgba(0,0,0,0.2)", 
                            borderRadius: "50%", 
                            borderTopColor: "#2E7D32", 
                            animation: "spin 1s ease-in-out infinite" 
                        }}></div>
                        <style>{`
                            @keyframes spin {
                                to { transform: rotate(360deg); }
                            }
                        `}</style>
                    </motion.div>
                )}
                
                {error && (
                    <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ 
                            color: "#D32F2F", 
                            textAlign: "center", 
                            marginTop: "15px",
                            fontWeight: "bold" 
                        }}
                    >
                        {error}
                    </motion.p>
                )}
            </AnimatePresence>
            
            <AnimatePresence>
                {prices && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        style={{ 
                            marginTop: "25px", 
                            padding: "20px", 
                            backgroundColor: "#FFF8DC", 
                            borderRadius: "10px",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
                        }}
                    >
                        <motion.h3 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            style={{ 
                                textAlign: "center", 
                                marginBottom: "20px",
                                color: "#5D4037",
                                fontSize: "22px",
                                fontWeight: "bold"
                            }}
                        >
                            Price Details
                        </motion.h3>
                        
                        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                            {prices.map((data, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ 
                                        scale: 1.02,
                                        boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
                                    }}
                                    style={{ 
                                        padding: "15px", 
                                        backgroundColor: "#FFFFFF", 
                                        borderRadius: "8px",
                                        border: "1px solid #E8DEBD",
                                        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                                        transition: "all 0.3s ease"
                                    }}
                                >
                                    <div style={{ 
                                        marginBottom: "15px", 
                                        paddingBottom: "10px", 
                                        borderBottom: "1px solid #E8DEBD"
                                    }}>
                                        <span style={{ fontWeight: "bold", color: "#2E7D32" }}>Grade:</span> 
                                        <span style={{ fontWeight: "bold", marginLeft: "5px" }}>{data.Grade}</span>
                                    </div>
                                    
                                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
                                        <motion.div 
                                            whileHover={{ scale: 1.05 }}
                                            style={{ 
                                                padding: "10px", 
                                                backgroundColor: "#E8F5E9", 
                                                borderRadius: "6px",
                                                textAlign: "center"
                                            }}
                                        >
                                            <div style={{ fontSize: "14px", color: "#2E7D32", marginBottom: "5px" }}>Min Price</div>
                                            <div style={{ fontSize: "18px", fontWeight: "bold" }}>₹ {data["Min Price"]}</div>
                                        </motion.div>
                                        
                                        <motion.div 
                                            whileHover={{ scale: 1.05 }}
                                            style={{ 
                                                padding: "10px", 
                                                backgroundColor: "#FFF3E0", 
                                                borderRadius: "6px",
                                                textAlign: "center"
                                            }}
                                        >
                                            <div style={{ fontSize: "14px", color: "#E65100", marginBottom: "5px" }}>Modal Price</div>
                                            <div style={{ fontSize: "18px", fontWeight: "bold" }}>₹ {data["Modal Price"]}</div>
                                        </motion.div>
                                        
                                        <motion.div 
                                            whileHover={{ scale: 1.05 }}
                                            style={{ 
                                                padding: "10px", 
                                                backgroundColor: "#E1F5FE", 
                                                borderRadius: "6px",
                                                textAlign: "center"
                                            }}
                                        >
                                            <div style={{ fontSize: "14px", color: "#0288D1", marginBottom: "5px" }}>Max Price</div>
                                            <div style={{ fontSize: "18px", fontWeight: "bold" }}>₹ {data["Max Price"]}</div>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default CropPriceLookup;
