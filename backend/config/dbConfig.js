const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
    maxPoolSize: 20
});

mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
    console.log("MongoDB connection error:", err);
});

module.exports = mongoose;