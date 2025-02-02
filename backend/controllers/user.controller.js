const userService = require('../services/user');

const createUser = async (req, res) => {
    try {
        const userData = req.body
        const user = await userService.createUser(userData);
        res.status(201).json(user)
    } catch (error) {
       res.status(400).json({ message: "Create user error"}) 
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(201).json(users)
    } catch (error) {
        res.status(400).json({ message: "get users error" })
    }
}

const getThisMonthRegisteredEmployees = async (req, res) => {
    try {
        const users = await userService.getThisMonthRegisteredEmployees();
        res.status(201).json(users)
    } catch (error) {
        res.status(400).json({ message: "get users error" })
    }
}

const getProfile = async (req, res) => {
    try {
        const users = await userService.getProfile(req.user._id);
        res.status(201).json(users)
    } catch (error) {
        res.status(400).json({ message: "get users error" })
    }
}

module.exports = {
    createUser,
    getAllUsers,
    getThisMonthRegisteredEmployees,
    getProfile
}