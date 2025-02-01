const User = require('../models/user');
const bcrypt = require('bcrypt');

async function createUser(userData) {
    try {
        const { username, email, password } = userData;
        const hashPassword = await bcrypt.hash(password, 10);

        const createUser = new User({
            username,
            email,
            password: hashPassword,
            role: 'staff'
        })

        const saveUser = await createUser.save();
        return saveUser;
    } catch (error) {
        console.log(error)
        throw error
    }
}

async function getAllUsers() {
    try {
        const users = await User.find({})
        return users;
    } catch (error) {
        console.log(error)
        throw error
    }
}


module.exports = {
    createUser,
    getAllUsers
}