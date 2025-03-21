import React, { useState } from "react";
import axios from "axios";

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
        <div style={{ maxWidth: "500px", margin: "auto", padding: "20px", textAlign: "center", border: "1px solid #ddd", borderRadius: "10px" }}>
            <h2>Crop Price Lookup</h2>
            
            <select value={commodity} onChange={(e) => setCommodity(e.target.value)} style={{ padding: "10px", width: "80%", marginBottom: "10px" }}>
                <option value="">Select Commodity</option>
                {commodityOptions.map((item, index) => (
                    <option key={index} value={item}>{item}</option>
                ))}
            </select>

            <select value={district} onChange={(e) => setDistrict(e.target.value)} style={{ padding: "10px", width: "80%", marginBottom: "10px" }}>
                <option value="">Select District</option>
                {districtOptions.map((item, index) => (
                    <option key={index} value={item}>{item}</option>
                ))}
            </select>
            
            <br />
            <button onClick={fetchPrices} style={{ padding: "10px 20px", border: "none", backgroundColor: "#007bff", color: "white", borderRadius: "5px", cursor: "pointer" }}>
                Get Prices
            </button>
            
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            
            {prices && (
                <div style={{ marginTop: "20px", padding: "10px", background: "#f8f9fa", borderRadius: "5px" }}>
                    <h3>Price Details</h3>
                    {prices.map((data, index) => (
                        <div key={index} style={{ marginBottom: "10px" }}>
                            <p><strong>Grade:</strong> {data.Grade}</p>
                            <p><strong>Min Price:</strong> {data["Min Price"]} ₹</p>
                            <p><strong>Max Price:</strong> {data["Max Price"]} ₹</p>
                            <p><strong>Modal Price:</strong> {data["Modal Price"]} ₹</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CropPriceLookup;
