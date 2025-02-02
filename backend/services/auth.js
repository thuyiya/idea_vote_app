const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const AccessToken = require("../models/access-token");
const { secretKey } = require("../config/jwtConfig");

const login = async (email, password) => {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        throw new Error("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error("Invalid email or password");
    }

    // Save token in MongoDB
    const { token } = await AccessToken.create({ userId: user._id, token: secretKey });

    return token;
};

const logout = async (token) => {
    return await AccessToken.deleteOne({ token });
};

module.exports = { login, logout };
