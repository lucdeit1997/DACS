"use strict";
const express = require('express');
const route = express.Router();
const Address = require('../models/Address');
const bodyParser = require('body-parser');

route.use(bodyParser.urlencoded({
    extended: false
}));

route.get('/list-post', (req, res) => {
    Address.getListAddress().then(result => {
        res.json({
            message: 'sucsess',
            data: result
        })
    }).catch(err => {
        message: 'fail'
    })
})
module.exports = route;
