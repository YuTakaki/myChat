const express = require('express');
const route = express.Router();
const dashboard = require('./controllers/dashboard_cotroller');

route.get('/isAuth/:id', require('../auth_setup/isAuth'), dashboard.getUserID );

route.post('/advance-search/:id', dashboard.advanceSearch);
route.get('/user/:id', dashboard.getUserInfo);
route.post('/addToContact/:id', dashboard.addToContact);
route.post('/deleteToContact/:id', dashboard.deleteToContact);
route.post('/sendMessage/', dashboard.sendMessage);

module.exports = route;