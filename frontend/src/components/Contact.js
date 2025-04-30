import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from '@emailjs/browser';

const Contact = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const form = useRef();

    useEffect(() => {
        emailjs.init("qWwAxQJbGOZxXtcFB");
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        if (name && email && message) {
            try {
                const templateParams = {
                    visitor_name: name,
                    visitor_email: email,
                    visitor_message: message,
                };

                console.log("Sending email with params:", templateParams);
                
                const result = await emailjs.send(
                    'service_i1iy0mt',
                    'template_v6yx7fl',
                    templateParams
                );

                if (result.status === 200) {
                    console.log("Email sent successfully!", result);
                    setSubmitted(true);
                    setName("");
                    setEmail("");
                    setMessage("");
                } else {
                    throw new Error('Failed to send email');
                }
            } catch (error) {
                console.error("Detailed error:", error);
                setError("Failed to send message. Please try again later.");
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            style={{ backgroundColor: "#FAEBCD", minHeight: "100vh", padding: "40px 20px" }}
        >
            <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{ maxWidth: "600px", margin: "auto", padding: "20px", textAlign: "center" }}
            >
                <motion.h2 
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "10px" }}
                >
                    Contact Us
                </motion.h2>
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    style={{ fontSize: "16px", color: "#555" }}
                >
                    Have questions? Feel free to reach out to us!
                </motion.p>

                <AnimatePresence mode="wait">
                    {submitted ? (
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            style={{ 
                                backgroundColor: "#28a745",
                                color: "white",
                                padding: "15px",
                                borderRadius: "5px",
                                marginTop: "20px"
                            }}
                        >
                            <p style={{ margin: 0, fontWeight: "bold" }}>
                                Thank you for contacting us! We'll get back to you soon.
                            </p>
                        </motion.div>
                    ) : (
                        <motion.form 
                            ref={form}
                            onSubmit={handleSubmit} 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            style={{ display: "flex", flexDirection: "column", gap: "15px", textAlign: "left" }}
                        >
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    style={{
                                        backgroundColor: "#dc3545",
                                        color: "white",
                                        padding: "10px",
                                        borderRadius: "5px",
                                        marginBottom: "10px"
                                    }}
                                >
                                    {error}
                                </motion.div>
                            )}

                            <motion.div
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.6 }}
                            >
                                <label style={{ marginBottom: "5px", display: "block" }}>Name:</label>
                                <motion.input 
                                    name="from_name"
                                    whileFocus={{ scale: 1.02, borderColor: "#28a745" }}
                                    transition={{ duration: 0.2 }}
                                    type="text" 
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)} 
                                    required 
                                    style={{ 
                                        padding: "10px", 
                                        border: "1px solid #ccc", 
                                        borderRadius: "5px",
                                        width: "100%",
                                        fontSize: "16px"
                                    }} 
                                />
                            </motion.div>

                            <motion.div
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.7 }}
                            >
                                <label style={{ marginBottom: "5px", display: "block" }}>Email:</label>
                                <motion.input 
                                    name="from_email"
                                    whileFocus={{ scale: 1.02, borderColor: "#28a745" }}
                                    transition={{ duration: 0.2 }}
                                    type="email" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    required 
                                    style={{ 
                                        padding: "10px", 
                                        border: "1px solid #ccc", 
                                        borderRadius: "5px",
                                        width: "100%",
                                        fontSize: "16px"
                                    }} 
                                />
                            </motion.div>

                            <motion.div
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.8 }}
                            >
                                <label style={{ marginBottom: "5px", display: "block" }}>Message:</label>
                                <motion.textarea 
                                    name="message"
                                    whileFocus={{ scale: 1.02, borderColor: "#28a745" }}
                                    transition={{ duration: 0.2 }}
                                    value={message} 
                                    onChange={(e) => setMessage(e.target.value)} 
                                    required 
                                    rows="4" 
                                    style={{ 
                                        padding: "10px", 
                                        border: "1px solid #ccc", 
                                        borderRadius: "5px",
                                        width: "100%",
                                        resize: "vertical",
                                        fontSize: "16px"
                                    }} 
                                />
                            </motion.div>

                            <motion.button 
                                type="submit"
                                disabled={loading}
                                whileHover={{ scale: loading ? 1 : 1.05 }}
                                whileTap={{ scale: loading ? 1 : 0.95 }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3, delay: 0.9 }}
                                style={{ 
                                    backgroundColor: loading ? "#94d3a2" : "#28a745", 
                                    color: "white", 
                                    padding: "12px", 
                                    border: "none", 
                                    borderRadius: "5px", 
                                    cursor: loading ? "not-allowed" : "pointer", 
                                    fontSize: "16px",
                                    fontWeight: "600",
                                    marginTop: "10px"
                                }}
                            >
                                {loading ? "Sending..." : "Send Message"}
                            </motion.button>
                        </motion.form>
                    )}
                </AnimatePresence>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1 }}
                    style={{ marginTop: "40px" }}
                >
                    <motion.h3 
                        style={{ fontSize: "22px", marginBottom: "20px", fontWeight: "bold" }}
                    >
                        Contact Information
                    </motion.h3>
                    <motion.p 
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 1.1 }}
                        style={{ marginBottom: "10px" }}
                    >
                        📍 Address: 123 Agro Seva Road, India
                    </motion.p>
                    <motion.p 
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 1.2 }}
                        style={{ marginBottom: "10px" }}
                    >
                        📞 Phone: +91 9876543210
                    </motion.p>
                    <motion.p 
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 1.3 }}
                    >
                        ✉️ Email: contact@agroseva.com
                    </motion.p>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default Contact;
