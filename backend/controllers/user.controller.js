const userService = require('../services/user');

const createUser = async (req, res) => {
    try {
        const userData = req.body
        const user = await userService.createUser(userData);
        res.status(201).json({user: user, message: "Successful"})
    } catch (error) {
       res.status(400).json({ message: "Create user error"}) 
    }
}

module.exports = {
    createUser
}