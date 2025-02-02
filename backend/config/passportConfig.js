const passport = require("passport");
const BearerStrategy = require("passport-http-bearer").Strategy;
const AccessToken = require("../models/access-token"); // AccessToken schema

passport.use(
    new BearerStrategy(async (token, done) => {
        try {
            // Find the token in the database
            const accessToken = await AccessToken.findOne({ token }).populate("userId");
            if (!accessToken) {
                return done(null, false, { message: "Invalid or expired token" });
            }

            // Pass the user associated with the token
            return done(null, accessToken.userId);
        } catch (error) {
            return done(error);
        }
    })
);

module.exports = passport;
