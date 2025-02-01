// swaggerConfig.js

const swaggerJsDoc = require('swagger-jsdoc');

// Swagger definition
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'IMS - Connect API Documentation',
            description: 'API documentation for the Idea and Vote system',
            version: '1.0.0',
            contact: {
                name: 'Thusitha Jayalath',
                email: 'thusitha@imsconnect.com',
            },
        },
        basePath: '/api', // Base path for all routes
    },
    apis: ['./routes/*.js'], // Path to your routes files
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;
