
import swaggerJsdoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "JIWASA API",
            version: "1.0.0",
            description: "API documentation for JIWASA backend application",
            contact: {
                name: "JIWASA Support",
            },
        },
        servers: [
            {
                url: "http://localhost:4000/api",
                description: "Local server",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    // Path to the API docs
    apis: ["./src/routes/*.js", "./src/models/*.js"], 
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
