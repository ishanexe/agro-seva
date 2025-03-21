import React, { useState } from "react";

const Contact = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name && email && message) {
            console.log("Form submitted:", { name, email, message });
            setSubmitted(true);
            // window.location.reload();
        }
    };

    return (
        <div style={{ maxWidth: "600px", margin: "auto", padding: "20px", textAlign: "center" }}>
            <h2 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "10px" }}>Contact Us</h2>
            <p style={{ fontSize: "16px", color: "#555" }}>
                Have questions? Feel free to reach out to us!
            </p>

            {submitted ? (
                <p style={{ color: "green", fontWeight: "bold" }}>Thank you for contacting us! We'll get back to you soon.</p>
            ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", textAlign: "left" }}>
                    <label>Name:</label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                        style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "5px" }} 
                    />

                    <label>Email:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "5px" }} 
                    />

                    <label>Message:</label>
                    <textarea 
                        value={message} 
                        onChange={(e) => setMessage(e.target.value)} 
                        required 
                        rows="4" 
                        style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "5px" }} 
                    />

                    <button type="submit" style={{ 
                        backgroundColor: "#28a745", 
                        color: "white", 
                        padding: "10px", 
                        border: "none", 
                        borderRadius: "5px", 
                        cursor: "pointer", 
                        fontSize: "16px"
                    }}>
                        Send Message
                    </button>
                </form>
            )}

            <h3 style={{ fontSize: "22px", marginTop: "20px", fontWeight: "bold" }}>Contact Information</h3>
            <p>📍 Address: 123 Agro Seva Road, India</p>
            <p>📞 Phone: +91 9876543210</p>
            <p>✉️ Email: contact@agroseva.com</p>
        </div>
    );
};

export default Contact;
