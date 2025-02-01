const jwt = require("jsonwebtoken");
const AccessToken = require("../models/access-token");
const { secretKey } = require("../config/jwtConfig");

const authenticateToken = async (req, res, next) => {
    try {
        const header = req.header("Authorization");
        if (!header) {
            return res.status(401).json({ message: "No Authorization Header" });
        }

        const [bearer, token] = header.split(" ");
        if (bearer !== "Bearer" || !token) {
            return res.status(401).json({ message: "Invalid Bearer Token" });
        }

        // Check if token exists in AccessToken collection **before** verifying JWT
        const accessToken = await AccessToken.findOne({ token });
        if (!accessToken) {
            return res.status(403).json({ message: "Token is not valid or logged out" });
        }

        // Verify the token if it exists in the database
        jwt.verify(token, secretKey, (err, decodedUser) => {
            if (err) {
                return res.status(403).json({ message: "Invalid or Expired Token" });
            }
            console.log("decodedUser ", decodedUser)
            req.user = decodedUser;
            next();
        });
    } catch (error) {
        res.status(401).json({ message: "Unauthorized Access", error: error.message });
    }
};

module.exports = { authenticateToken };
