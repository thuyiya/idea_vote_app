const passport = require("passport");

const authenticateToken = (req, res, next) => {
    passport.authenticate("bearer", { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(401).json({ message: "Unauthorized action, please login again" });
        }
        req.user = user;
        next();
    })(req, res, next);
};

module.exports = { authenticateToken };
