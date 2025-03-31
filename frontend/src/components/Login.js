// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Auth.css'; // Import shared CSS for Login/Signup

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', formData);
            localStorage.setItem('token', response.data.token); // Store the JWT token
            localStorage.setItem('userType', response.data.role); // Store user type
    
            // Redirect based on user role
            navigate(response.data.role === 'farmer' ? '/farmer-home' : '/');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2 className="auth-title">Login</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                        name="email" 
                        type="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        placeholder="Email" 
                        required 
                    />
                    <input 
                        name="password" 
                        type="password" 
                        value={formData.password} 
                        onChange={handleChange} 
                        placeholder="Password" 
                        required 
                    />
                    <button type="submit">Login</button>
                    {error && <p className="auth-error">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default Login;
