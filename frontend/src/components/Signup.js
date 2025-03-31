import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Auth.css'; // Import shared CSS for Login/Signup

const Signup = () => {
    const navigate = useNavigate(); // Initialize navigate function
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'user' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Loading state
    let isMounted = true; // Flag to track mounted state

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading state
        setError(''); // Clear previous error
    
        // Simple client-side validation
        if (!formData.name || !formData.email || !formData.password) {
            setError('All fields are required.');
            setLoading(false);
            return;
        }
    
        try {
            const response = await axios.post('http://localhost:5000/api/auth/signup', formData);
            if (response.status === 201) {
                navigate('/login'); // Redirect to login after successful signup
            }
        } catch (err) {
            if (isMounted) { // Check if still mounted
                const errorMessage = err.response?.data?.msg || 'An error occurred during signup.'; // Use 'msg' here
                setError(errorMessage); // Display the error message
            }
        } finally {
            if (isMounted) { // Check if still mounted
                setLoading(false); // Stop loading state
            }
        }    
    };

    // Cleanup function to set the mounted flag to false
    useEffect(() => {
        return () => {
            isMounted = false; // Component unmounted
        };
    }, []);

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2 className="auth-title">Signup</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        placeholder="Name" 
                        required 
                    />
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
                    <select 
                        name="role" 
                        value={formData.role} 
                        onChange={handleChange} 
                        style={{ padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '1rem' }}
                    >
                        <option value="user">User</option>
                        <option value="farmer">Farmer</option>
                    </select>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Signing Up...' : 'Signup'}
                    </button>
                    {error && <p className="auth-error">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default Signup;
