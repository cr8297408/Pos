const expressjwt = require('express-jwt');

const config = require('../env');

const JWT_SECRET = config.security.JWT_SECRET;
const JWT_ALGORITHMS = config.security.JWT_ALGORITHMS;

const expressJWT = expressjwt({
    secret: JWT_SECRET,
    algorithms: [JWT_ALGORITHMS],
}).unless({
    path: [ 
        '/auth/login', 
        '/auth/registro',
    ],
});

module.exports = expressJWT;