
const mongoose = require('mongoose');

console.log("process.env.MONGO_URI ", process.env.MONGO_URI)

mongoose.connect(process.env.MONGO_URI);

mongoose.connection.on("connected", () => {
    console.log("Connected to mongodb")
})

mongoose.connection.on("error", (err) => {
    console.log("Mongodb connection error ", err)
})

module.exports = mongoose;