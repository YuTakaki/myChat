const express = require('express');
const route = express.Router();
const dashboard = require('./controllers/dashboard_cotroller');

route.get('/isAuth/:id', require('../auth_setup/isAuth'), dashboard.getUserID );

route.post('/advance-search/:id', dashboard.advanceSearch);
route.get('/user/:id', dashboard.getUserInfo);
route.get('/user2/:id', dashboard.getUserInfo2);
route.post('/addToContact/:id', dashboard.addToContact);
route.post('/deleteToContact/:id', dashboard.deleteToContact);
route.post('/editAccount/', dashboard.editAccount);
route.post('/messages/:username', dashboard.getUserMessages);
route.post('/updateImage/:id', dashboard.updateImage);
route.post('/message/seen/:id', dashboard.seenMessage);

module.exports = route;