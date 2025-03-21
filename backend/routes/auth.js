const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const JWT_SEC = "agro-sec-key"; //my secert key

// Route 1 -> Signup (POST: /api/auth/signup)
router.post("/signup", async (req, res) => { //hit api call at /signup
    const { name, email, password } = req.body;  //req body for signup

    try {
        //validating all inputs
        if (!name || !email || !password) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        // check if mail already exits, if it does redirect to login
        const isMail = await User.findOne({ email }); //finding in outr db
        if (isMail) {
            return res.status(400).json({ msg: "Email already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = await User.create({  //User is a class and newUser is its blueprint(object)
            name,
            email,
            password: hashedPass,
        });

        // Generate JWT token without expiration
        const payload = {
            myUser: {
                id: newUser._id,
            },
        };

        const jwtData = jwt.sign(payload, JWT_SEC); // No `expiresIn` set here

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