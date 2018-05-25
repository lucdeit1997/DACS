"use strict";
const express = require('express');
const route = express.Router();
const Post = require('../models/Post');
const bodyParser = require('body-parser');

route.use(bodyParser.urlencoded({
    extended: false
}));

route.post('/add-post', (req, res) => {
    // const a = { title: '21', contentSmall: '23', contentLarge: '123', Tinh: 'PY', Huyen: 'as', Thon_Xa: 'asd' };
    // Post.addPost(a).then(result => console.log(result)).catch(err => console.log(err.message));
    const { CategoryID, title, contentSmall, contentLarge, image, price, acreage, Tinh,Huyen, Thon_Xa } = req.body;
    Post.addPost( CategoryID, title, contentSmall, contentLarge, image, price, acreage, Tinh, Huyen, Thon_Xa ).then(result => {
        res.json({result});
    }).catch(err => res.json("Loi" + err.message));
});

route.get('/delete-post/:idPost', (req, res) => {
    const {idPost} = req.params;
    console.log(idPost)
    Post.removePost(idPost).then(result => {
        res.json({
            message: "success",
            data: result
        })
    }).catch(err => {
        res.json({
            message: "fail",
        })
    })
})

route.post('/update-post/:idPost',(req, res) => {
    const {idPost} = req.params;
    const { CategoryID, title, contentSmall, contentLarge, image, price, acreage, Tinh,Huyen, Thon_Xa } = req.body;   
    Post.updatePost(idPost,CategoryID, title, contentSmall, contentLarge, image, price, acreage, Tinh, Huyen, Thon_Xa )
    .then(result => {
        res.json({
            message: 'succsess',
            data: result
        })
    }).catch(err => {
        res.json({
            message: 'fail',
            data: result
        })
    })
})

route.get('/get-list-post',(req, res) => {
    Post.getListPost().then(result => {
        res.json({
            message: 'sucsess',
            data: result,
        })
    }).catch(err => {
        res.json({
            message: 'fail',
        })
    })
})

module.exports = route;