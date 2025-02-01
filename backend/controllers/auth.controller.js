const authService = require("../services/auth");

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
       const token =  await authService.login(email, password)
        res.status(200).json({ token , message: "Successful"})
    } catch (error) {
        res.status(401).json({ message: "Invalid Credentials"})
    }
}

const logout = async (req, res) => {
    try {
        const token = req.header("Authorization").split(" ")[1];
        if (!token) {
            throw new Error("No token provided")
        }

        const data = await authService.logout(token)
        res.status(200).json({ data, message: "Logout Successful" })
    } catch (error) {
        console.log(error)
        res.status(401).json({ message: "Logout Failed" })
    }
}

module.exports = {
    login,
    logout
}