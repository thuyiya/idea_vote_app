const User = require('../models/user');
const bcrypt = require('bcrypt');

async function createUser(userData) {
    try {
        const { username, email, password, name, role } = userData;
        const hashPassword = await bcrypt.hash(password, 10);

        const createUser = new User({
            username,
            email,
            name,
            password: hashPassword,
            role: role || 'staff'
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

async function getThisMonthRegisteredEmployees() {
    try {
        const currentDate = new Date();
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

        const users = await User.find({
            createdAt: {
                $gte: firstDayOfMonth, // Greater than or equal to the first day of the current month
                $lt: lastDayOfMonth,   // Less than the first day of the next month
            }
        });

        return users;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getProfile(id) {
    try {
        const user = await User.findOne({
            _id: id
        });

        return user;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


module.exports = {
    createUser,
    getAllUsers,
    getThisMonthRegisteredEmployees,
    getProfile
}