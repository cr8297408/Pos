const express = require('express');
const swaggerUi = require('swagger-ui-express')

const config = require('../env')
const db = require('../connection/connectBD')
const swaggerDoc = require('../../../swagger.json');
const Routes = require('../../routes')

const app = express();

app.use(express.json());

if (swaggerDoc) {
  app.use('/api-docs', swaggerUi.serve)
  app.use('/api-docs', swaggerUi.setup(swaggerDoc))
}

const port = config.port;

/**
 * @constructs express.Application Routes
 */
app.use(Routes);

app.set('port', port)


module.exports = app;