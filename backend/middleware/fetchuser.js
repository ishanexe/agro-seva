var jwt = require("jsonwebtoken");
const JWT_SEC = "my-jwt-seckey";

//checks if the incoming user has the token (ensures legit user has the entry)
const fetchuser = (req, res, next) => {   
    const token = req.header('auth-token');

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const data = jwt.verify(token, JWT_SEC);
        req.user = data.myUser;  

        next();
    } catch (err) {
        return res.status(400).json({ error: err.message }); //here it is failing
    }
};

module.exports = fetchuser;

