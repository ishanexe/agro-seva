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
            console.log("Price data:", response.data);
            setPrices(response.data);
        } catch (err) {
            setError("Failed to fetch price data.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ 
            backgroundColor: "#FAEBCD", 
            minHeight: "100vh", 
            padding: "40px 20px",
            fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif"
        }}>
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                style={{ 
                    maxWidth: "1000px", 
                    margin: "0 auto",
                    padding: "30px"
                }}
            >
                <motion.h1 
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    style={{ 
                        textAlign: "center", 
                        marginBottom: "30px", 
                        color: "#4B5320",
                        fontSize: "2.5rem",
                        fontWeight: "700"
                    }}
                >
                    Crop Price Information
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    style={{ 
                        backgroundColor: "#FFF", 
                        padding: "30px",
                        borderRadius: "20px",
                        marginBottom: "30px"
                    }}
                >
                    <div style={{ 
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "20px",
                        marginBottom: "25px"
                    }}>
                        <div>
                            <label style={{ 
                                display: "block", 
                                marginBottom: "10px", 
                                color: "#4B5320", 
                                fontWeight: "600",
                                fontSize: "1rem"
                            }}>
                                Select Commodity
                            </label>
                            <motion.select 
                                whileHover={{ scale: 1.01 }}
                                whileFocus={{ scale: 1.01 }}
                                transition={{ duration: 0.2 }}
                                value={commodity} 
                                onChange={(e) => setCommodity(e.target.value)} 
                                style={{ 
                                    width: "100%",
                                    padding: "12px 16px",
                                    border: "2px solid #D7CCA3",
                                    borderRadius: "12px",
                                    fontSize: "16px",
                                    color: "#4B5320",
                                    backgroundColor: "#FFF",
                                    cursor: "pointer",
                                    outline: "none",
                                    transition: "all 0.2s ease"
                                }}
                            >
                                <option value="">-- Select a commodity --</option>
                                {commodityOptions.map((item, index) => (
                                    <option key={index} value={item}>{item}</option>
                                ))}
                            </motion.select>
                        </div>

                        <div>
                            <label style={{ 
                                display: "block", 
                                marginBottom: "10px", 
                                color: "#4B5320", 
                                fontWeight: "600",
                                fontSize: "1rem"
                            }}>
                                Select District
                            </label>
                            <motion.select 
                                whileHover={{ scale: 1.01 }}
                                whileFocus={{ scale: 1.01 }}
                                transition={{ duration: 0.2 }}
                                value={district} 
                                onChange={(e) => setDistrict(e.target.value)} 
                                style={{ 
                                    width: "100%",
                                    padding: "12px 16px",
                                    border: "2px solid #D7CCA3",
                                    borderRadius: "12px",
                                    fontSize: "16px",
                                    color: "#4B5320",
                                    backgroundColor: "#FFF",
                                    cursor: "pointer",
                                    outline: "none",
                                    transition: "all 0.2s ease"
                                }}
                            >
                                <option value="">-- Select a district --</option>
                                {districtOptions.map((item, index) => (
                                    <option key={index} value={item}>{item}</option>
                                ))}
                            </motion.select>
                        </div>
                    </div>

                    <motion.button 
                        onClick={fetchPrices} 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        style={{ 
                            width: "100%",
                            padding: "14px 20px",
                            border: "none",
                            backgroundColor: "#6B8E23",
                            color: "white",
                            borderRadius: "12px",
                            cursor: "pointer",
                            fontSize: "16px",
                            fontWeight: "600",
                            transition: "all 0.2s ease"
                        }}
                    >
                        Check Prices
                    </motion.button>
                </motion.div>

                <AnimatePresence>
                    {loading && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{ 
                                textAlign: "center", 
                                marginTop: "30px"
                            }}
                        >
                            <div style={{ 
                                display: "inline-block",
                                width: "40px",
                                height: "40px",
                                border: "3px solid rgba(107, 142, 35, 0.3)",
                                borderRadius: "50%",
                                borderTopColor: "#6B8E23",
                                animation: "spin 1s ease-in-out infinite"
                            }}></div>
                            <p style={{ 
                                color: "#6B8E23",
                                marginTop: "15px",
                                fontWeight: "500"
                            }}>
                                Fetching latest prices...
                            </p>
                        </motion.div>
                    )}

                    {error && (
                        <motion.div 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            style={{ 
                                backgroundColor: "#FFF",
                                color: "#D32F2F",
                                padding: "16px 20px",
                                borderRadius: "12px",
                                marginTop: "20px",
                                textAlign: "center",
                                fontSize: "15px",
                                fontWeight: "500"
                            }}
                        >
                            {error}
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {prices && (
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            style={{ marginTop: "30px" }}
                        >
                            <div style={{ 
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                                gap: "20px"
                            }}>
                                {prices.map((data, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ 
                                            y: -5,
                                            transition: { duration: 0.2 }
                                        }}
                                        style={{ 
                                            backgroundColor: "#FFF",
                                            borderRadius: "16px",
                                            overflow: "hidden",
                                            transition: "all 0.3s ease",
                                            cursor: "pointer"
                                        }}
                                    >
                                        <div style={{
                                            backgroundColor: "#6B8E23",
                                            padding: "20px",
                                            color: "white",
                                            position: "relative",
                                            overflow: "hidden"
                                        }}>
                                            <motion.div
                                                initial={{ scale: 1 }}
                                                whileHover={{ scale: 1.05 }}
                                                style={{
                                                    position: "relative",
                                                    zIndex: 1
                                                }}
                                            >
                                                <div style={{
                                                    fontSize: "1.2rem",
                                                    fontWeight: "600",
                                                    marginBottom: "5px"
                                                }}>
                                                    {data.Market || "Market Name"}
                                                </div>
                                                <div style={{
                                                    fontSize: "0.9rem",
                                                    opacity: 0.9
                                                }}>
                                                    APMC Market Price
                                                </div>
                                            </motion.div>
                                        </div>

                                        <motion.div 
                                            style={{ padding: "20px" }}
                                            initial={{ opacity: 1 }}
                                            whileHover={{ opacity: 0.9 }}
                                        >
                                            <AnimatedPriceItem 
                                                label="Minimum Price"
                                                value={data["Min Price"]}
                                                color="#4B5320"
                                            />
                                            <div style={{ height: "10px" }} />
                                            <AnimatedPriceItem 
                                                label="Modal Price"
                                                value={data["Modal Price"]}
                                                color="#6B8E23"
                                            />
                                            <div style={{ height: "10px" }} />
                                            <AnimatedPriceItem 
                                                label="Maximum Price"
                                                value={data["Max Price"]}
                                                color="#8B9556"
                                            />
                                        </motion.div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
            <style jsx>{`
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

const AnimatedPriceItem = ({ label, value, color }) => (
    <motion.div
        whileHover={{ 
            scale: 1.02,
            backgroundColor: `${color}15`
        }}
        initial={{ scale: 1 }}
        style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "12px",
            backgroundColor: "#F9F6EE",
            borderRadius: "8px",
            transition: "all 0.2s ease"
        }}
    >
        <motion.div 
            initial={{ x: 0 }}
            whileHover={{ x: 3 }}
            style={{ color: "#4B5320", fontSize: "0.9rem" }}
        >
            {label}
        </motion.div>
        <motion.div 
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            style={{ 
                color: color,
                fontSize: "1.1rem",
                fontWeight: "600"
            }}
        >
            ₹{value}
        </motion.div>
    </motion.div>
);

export default CropPriceLookup;
