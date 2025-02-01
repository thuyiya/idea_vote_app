"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan")); // Import morgan for HTTP request logging
const auth_1 = __importDefault(require("./routes/auth"));
const ideas_1 = __importDefault(require("./routes/ideas"));
const votes_1 = __importDefault(require("./routes/votes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middleware for logging HTTP requests
app.use((0, morgan_1.default)('dev')); // Logs requests in the console
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Enable CORS for all routes
app.use((0, cors_1.default)({
    origin: '*', // Allow all origins (for development only)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
}));
// Connect to MongoDB
mongoose_1.default.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));
// Routes
app.use('/api/auth', auth_1.default);
app.use('/api/ideas', ideas_1.default);
app.use('/api/votes', votes_1.default);
app.get('/', (req, res) => {
    res.send('Idea Vote App Backend');
});
// Log all incoming requests
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
