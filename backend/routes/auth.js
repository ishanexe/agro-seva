const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const JWT_SEC = "agro-sec-key"; //my secert key

// Route 1 -> Signup (POST: /api/auth/signup)
router.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        // Check if email already exists
        const isMail = await User.findOne({ email });
        console.log('isMail:', isMail); // Log to verify if email already exists
        if (isMail) {
            return res.status(400).json({ msg: "Email already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);
        console.log('hashedPass:', hashedPass); // Log to verify the hashed password

        // Create user
        const newUser = await User.create({ name, email, password: hashedPass });
        console.log('newUser:', newUser); // Log to verify the created user

        // Generate JWT token
        const payload = { myUser: { id: newUser._id } };
        const jwtData = jwt.sign(payload, JWT_SEC);
        console.log('jwtData:', jwtData); // Log to verify the JWT token

        res.json({
            message: "Signup successful",
            token: jwtData,
            user: newUser,
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
            user: curUser,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


module.exports = router;
