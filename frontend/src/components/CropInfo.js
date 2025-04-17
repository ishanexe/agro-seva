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
                    maxWidth: "800px", 
                    margin: "0 auto", 
                    padding: "35px", 
                    backgroundColor: "white", 
                    borderRadius: "16px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
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
                        fontSize: "2.2rem",
                        fontWeight: "700"
                    }}
                >
                    Crop Price Information
                </motion.h1>
                
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    style={{
                        textAlign: "center",
                        marginBottom: "30px",
                        color: "#666",
                        maxWidth: "500px",
                        margin: "0 auto 40px"
                    }}
                >
                    Select a commodity and district to get the latest market prices for agricultural products.
                </motion.p>
                
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    style={{ 
                        backgroundColor: "rgba(107, 142, 35, 0.06)", 
                        padding: "25px", 
                        borderRadius: "12px",
                        marginBottom: "30px"
                    }}
                >
                    <div style={{ marginBottom: "20px" }}>
                        <label style={{ 
                            display: "block", 
                            marginBottom: "8px", 
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
                                padding: "13px 16px", 
                                width: "100%", 
                                marginBottom: "20px",
                                borderRadius: "8px",
                                border: "2px solid #D7CCA3",
                                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                                fontSize: "16px",
                                color: "#333",
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

                        <label style={{ 
                            display: "block", 
                            marginBottom: "8px", 
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
                                padding: "13px 16px", 
                                width: "100%", 
                                borderRadius: "8px",
                                border: "2px solid #D7CCA3",
                                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                                fontSize: "16px",
                                color: "#333",
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
            
                    <motion.button 
                onClick={fetchPrices} 
                        whileHover={{ scale: 1.02, backgroundColor: "#5A7D12" }}
                        whileTap={{ scale: 0.98 }}
                        style={{ 
                            padding: "14px 20px", 
                            width: "100%",
                            border: "none", 
                            backgroundColor: "#6B8E23", 
                            color: "white", 
                            borderRadius: "8px", 
                            cursor: "pointer",
                            fontSize: "16px",
                            fontWeight: "600",
                            boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
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
                                marginTop: "20px", 
                                marginBottom: "20px" 
                            }}
                        >
                            <div style={{ 
                                display: "inline-block", 
                                width: "35px", 
                                height: "35px", 
                                border: "3px solid rgba(107, 142, 35, 0.3)", 
                                borderRadius: "50%", 
                                borderTopColor: "#6B8E23", 
                                animation: "spin 1s ease-in-out infinite" 
                            }}></div>
                            <p style={{ 
                                color: "#6B8E23", 
                                marginTop: "10px", 
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
                            transition={{ duration: 0.3 }}
                            style={{ 
                                color: "white", 
                                backgroundColor: "#D32F2F",
                                padding: "12px 16px",
                                borderRadius: "8px",
                                marginTop: "20px",
                                marginBottom: "20px",
                                textAlign: "center"
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
                            style={{ 
                                marginTop: "25px"
                            }}
                        >
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    marginBottom: "20px",
                                    paddingBottom: "10px",
                                    borderBottom: "1px solid #e0e0e0"
                                }}
                            >
                                <h3 style={{ 
                                    color: "#4B5320", 
                                    fontSize: "1.5rem", 
                                    margin: 0,
                                    fontWeight: "600"
                                }}>
                                    Price Details
                                </h3>
                                <div style={{
                                    color: "#666",
                                    fontSize: "0.9rem"
                                }}>
                                    {new Date().toLocaleDateString('en-US', { 
                                        year: 'numeric', 
                                        month: 'long', 
                                        day: 'numeric' 
                                    })}
                                </div>
                            </motion.div>
                            
                            <div style={{ 
                                display: "flex", 
                                flexDirection: "column", 
                                gap: "20px" 
                            }}>
                        {prices.map((data, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        style={{ 
                                            padding: "20px", 
                                            backgroundColor: "#F9F6EE", 
                                            borderRadius: "12px",
                                            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                                            border: "1px solid rgba(215, 204, 163, 0.3)"
                                        }}
                                    >
                                        <div style={{ 
                                            marginBottom: "18px", 
                                            paddingBottom: "10px", 
                                            borderBottom: "1px dashed rgba(107, 142, 35, 0.3)",
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center"
                                        }}>
                                            <div>
                                                <span style={{ 
                                                    fontWeight: "600", 
                                                    color: "#4B5320",
                                                    fontSize: "0.9rem"
                                                }}>
                                                    Market:
                                                </span> 
                                                <span style={{ 
                                                    fontWeight: "bold", 
                                                    marginLeft: "5px",
                                                    fontSize: "1.1rem"
                                                }}>
                                                    {data.Market}
                                                </span>
                                            </div>
                                            <div style={{
                                                backgroundColor: "rgba(107, 142, 35, 0.2)",
                                                color: "#4B5320",
                                                padding: "4px 10px",
                                                borderRadius: "20px",
                                                fontSize: "12px",
                                                fontWeight: "bold"
                                            }}>
                                                APMC Market Price
                                            </div>
                                        </div>
                                        
                                        <div style={{ 
                                            display: "grid", 
                                            gridTemplateColumns: "repeat(3, 1fr)", 
                                            gap: "15px" 
                                        }}>
                                            <motion.div 
                                                whileHover={{ scale: 1.04, y: -5 }}
                                                transition={{ type: "spring", stiffness: 300 }}
                                                style={{ 
                                                    padding: "15px", 
                                                    backgroundColor: "white", 
                                                    borderRadius: "10px",
                                                    textAlign: "center",
                                                    boxShadow: "0 3px 8px rgba(0,0,0,0.04)",
                                                    border: "1px solid rgba(46, 125, 50, 0.1)"
                                                }}
                                            >
                                                <div style={{ 
                                                    fontSize: "14px", 
                                                    color: "#2E7D32", 
                                                    marginBottom: "8px",
                                                    fontWeight: "500" 
                                                }}>
                                                    Minimum Price
                                                </div>
                                                <div style={{ 
                                                    fontSize: "1.4rem", 
                                                    fontWeight: "700",
                                                    color: "#2E7D32"
                                                }}>
                                                    ₹ {data["Min Price"]}
                                                </div>
                                                <div style={{ 
                                                    fontSize: "12px", 
                                                    color: "#666", 
                                                    marginTop: "5px" 
                                                }}>
                                                    per quintal
                                                </div>
                                            </motion.div>
                                            
                                            <motion.div 
                                                whileHover={{ scale: 1.04, y: -5 }}
                                                transition={{ type: "spring", stiffness: 300 }}
                                                style={{ 
                                                    padding: "15px", 
                                                    backgroundColor: "white", 
                                                    borderRadius: "10px",
                                                    textAlign: "center",
                                                    boxShadow: "0 3px 8px rgba(0,0,0,0.04)",
                                                    border: "1px solid rgba(230, 81, 0, 0.1)"
                                                }}
                                            >
                                                <div style={{ 
                                                    fontSize: "14px", 
                                                    color: "#E65100", 
                                                    marginBottom: "8px",
                                                    fontWeight: "500" 
                                                }}>
                                                    Modal Price
                                                </div>
                                                <div style={{ 
                                                    fontSize: "1.4rem", 
                                                    fontWeight: "700",
                                                    color: "#E65100"
                                                }}>
                                                    ₹ {data["Modal Price"]}
                                                </div>
                                                <div style={{ 
                                                    fontSize: "12px", 
                                                    color: "#666", 
                                                    marginTop: "5px" 
                                                }}>
                                                    per quintal
                                                </div>
                                            </motion.div>
                                            
                                            <motion.div 
                                                whileHover={{ scale: 1.04, y: -5 }}
                                                transition={{ type: "spring", stiffness: 300 }}
                                                style={{ 
                                                    padding: "15px", 
                                                    backgroundColor: "white", 
                                                    borderRadius: "10px",
                                                    textAlign: "center",
                                                    boxShadow: "0 3px 8px rgba(0,0,0,0.04)",
                                                    border: "1px solid rgba(2, 136, 209, 0.1)"
                                                }}
                                            >
                                                <div style={{ 
                                                    fontSize: "14px", 
                                                    color: "#0288D1", 
                                                    marginBottom: "8px",
                                                    fontWeight: "500" 
                                                }}>
                                                    Maximum Price
                                                </div>
                                                <div style={{ 
                                                    fontSize: "1.4rem", 
                                                    fontWeight: "700",
                                                    color: "#0288D1"
                                                }}>
                                                    ₹ {data["Max Price"]}
                                                </div>
                                                <div style={{ 
                                                    fontSize: "12px", 
                                                    color: "#666", 
                                                    marginTop: "5px" 
                                                }}>
                                                    per quintal
                                                </div>
                                            </motion.div>
                                        </div>
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

export default CropPriceLookup;
