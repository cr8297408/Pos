const config = require('../env/index');
const URL_SWAGGER = config.URL_SWAGGER;

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Pos Api',
            version: '1.0.0',
        },
        servers: [
            {
		    url: URL_SWAGGER,
                description: "local server",
            },
        ],
        // components: {
        //     securitySchemes: {
        //         bearerAuth: {
        //             type: 'http',
        //             scheme: 'bearer',
        //             in: 'header'
        //         },
        //     },
        // },
        // security: [
        //     {
        //         bearerAuth: [],
        //     },
        // ],
    },
    apis: ['./src/routes/*.js'],
};

module.exports = swaggerOptions;