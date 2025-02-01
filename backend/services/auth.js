const bcrypt = require('bcrypt');

const User = require("../models/user");
const AccessToken = require("../models/access-token");
const { generateToken } = require('../utils/jwt');

const login = async (email, password) => {
    try {
        const existingUser = await User.findOne({ email }).select("+password");
        if (!existingUser) {
            throw new Error("Invalid credentials, please register");
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            throw new Error("Invalid credentials");
        }

        const token = generateToken(existingUser);

        // Save token in AccessToken collection
        await AccessToken.create({ userId: existingUser._id, token });

        return token;
    } catch (error) {
        console.log("--- ", error)
        throw error;
    }
};

const logout = async (token) => {
    try {
        return await AccessToken.deleteOne({ token });

    } catch (error) {
        throw error
    }
};

module.exports = { login, logout };
