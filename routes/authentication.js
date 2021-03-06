const express = require('express');
const authentication = require('./controllers/authentication_controller');

const route = express.Router();




route.post('/sign-up',authentication.sign_up);

route.post('/sign-in', authentication.sign_in);

route.get('/sign-out',authentication.logout);

route.get('/offline/:id', authentication.offline);

route.get('/online/:id', authentication.online)

module.exports = route;
