const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const JWT_SEC = "agro-sec-key"; //my secert key

// Route 1 -> Signup (POST: /api/auth/signup)
router.post("/signup", async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        // Check if all required fields are provided
        if (!name || !email || !password || !role) {
            return res.status(400).json({ msg: "All fields are required, including role" });
        }
        console.log(role);  // Add this before your role validation to check the value being sent

        // Validate the role field
        // Validate the role field with case insensitivity
        if(role=='user') role='advisory'
        if (role.toLowerCase() !== 'farmer' && role.toLowerCase() !== 'advisory' && role.toLowerCase() !== 'admin') {
            return res.status(400).json({ msg: "Role must be either 'farmer' or 'advisory' or 'admin'" });
        }


        // Validate the email format (basic check)
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ msg: "Invalid email format" });
        }

        // Check if the email already exists
        const isMail = await User.findOne({ email });
        if (isMail) {
            return res.status(400).json({ msg: "Email already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

        // Create the new user with the provided data
        const newUser = await User.create({ name, email, password: hashedPass, role });
        
        // Generate a JWT token for the new user
        const payload = { myUser: { id: newUser._id, role: newUser.role } };
        const jwtData = jwt.sign(payload, JWT_SEC, { expiresIn: '1h' });  // Added expiration for token (1 hour)

        // Send response with the token and user data
        res.json({
            message: "Signup successful",
            token: jwtData,
            user: {
                ...newUser._doc, // Spread the entire newUser object to retain all fields (like name, email, etc.)
                role: newUser.role // Explicitly include the role field
            }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



// Route 2 -> Login (POST: /api/auth/login)
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Validate input
        if (!email || !password) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        // Find user by email
        const curUser = await User.findOne({ email });
        if (!curUser) {
            return res.status(400).json({ msg: "User not found" });
        }

        // Compare passwords
        //decrypt the pasword enetred by the user and check against his stored password
        const isPass = await bcrypt.compare(password, curUser.password);
        if (!isPass) {
            return res.status(400).json({ msg: "Invalid password" });
        }

        // Generate JWT token without expiration
        const payload = {
            myUser: {
                id: curUser._id,
            },
        };

        const jwtData = jwt.sign(payload, JWT_SEC); // No `expiresIn` set here

        res.json({
            message: "Login successful",
            token: jwtData,
            user: {
              ...curUser._doc,    // all user fields (name, email, etc.)
              // you could also omit password here for safety e.g. delete user.password
            },
            role: curUser.role   // explicit role field
          });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


module.exports = router;