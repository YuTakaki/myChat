const express = require('express');
const route = express.Router();
const dashboard = require('./controllers/dashboard_cotroller');

route.get('/isAuth/:id', require('../auth_setup/isAuth'), dashboard.getUserID );

route.post('/advance-search/:id', dashboard.advanceSearch);

module.exports = route;