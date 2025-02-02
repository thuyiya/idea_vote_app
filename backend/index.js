require('dotenv').config();
const express =  require('express');
const morgan = require('morgan');
const cors = require('cors');
const body_parser = require('body-parser');
const swaggerUi = require('swagger-ui-express');

const userRoute = require('./routes/user.route');
const authRoute = require('./routes/auth.route');
const ideaRoute = require('./routes/idea.route');
const voteRoute = require('./routes/vote.route');
const notificationRoute = require('./routes/notification.route');
const swaggerDocs = require('./config/swaggerConfig');
const passport = require("./config/passportConfig");

const app = express();
const PORT = process.env.PORT || 3002;

app.use(passport.initialize());

app.use(morgan('dev')); // Logs requests in the console

app.use(body_parser.json());
app.use(cors());

app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/ideas", ideaRoute)
app.use("/api/votes", voteRoute)
app.use("/api/notifications", notificationRoute)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, {
    customCss: '.swagger-ui .topbar { display: none }', // Example to hide the top bar
    customSiteTitle: "IMS-Connect API Docs", // Custom title for the documentation page
}))

app.use(cors({
    origin: '*', // Allow all origins (for development only)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
}));

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.listen(PORT, () => {
    console.log(`server is listing to http://localhost:${PORT}`)
})