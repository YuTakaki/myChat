const express = require('express');
const route = express.Router();

route.get('/isAuth/:id', require('../auth_setup/isAuth'), (req, res) => {
    res.send(req.params.id);
});

module.exports = route;