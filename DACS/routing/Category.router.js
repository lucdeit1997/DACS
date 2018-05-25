"use strict";
const express = require('express');
const route = express.Router();
const Category = require('../models/Category');
const bodyParser = require('body-parser');

route.use(bodyParser.urlencoded({
    extended: false
}));

route.post('/add-category', (req, res) => {
    const { CategoryName } = req.body;
    Category.addCategory(CategoryName).then(result => {
        res.json({result});
    }).catch(err => res.json("Loi" + err.message));
});

route.get('/get-list-category', (req, res) => {
    Category.getListCategory().then(result => {
        res.json({message: result});
    }).catch(err => res.json("Loi" + err.message));
})

route.post('/remove-category', (req, res) => {
    let { CategoryId } = req.body;
    Category.removeCategory(CategoryId).then(result => {
        res.json({message: result})
    }).catch(err => {
        res.json("Loi" + err.message);
    })
})

route.post('/update-category', (req, res) => {
    let { CategoryId, CategoryName } = req.body;
    Category.updateCategory(CategoryId, CategoryName).then(result => {
        res.json({message: result})
    }).catch(err => {
        res.json("Loi" + err.message);
    })
})



module.exports = route;