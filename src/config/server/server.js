const express = require('express');
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc');

const config = require('../env')
const db = require('../connection/connectBD')
const swaggerDoc = require('../swagger/swaggerOptions');

const Routes = require('../../routes')

const app = express();

app.use(express.json());

const swaggerSpecs = swaggerJsDoc(swaggerDoc);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs));

const port = config.port;

/**
 * @constructs express.Application Routes
 */
app.use(Routes);

app.set('port', port)


module.exports = app;