"use strict";
const express = require('express');
const route = express.Router();
const User = require('../models/User');
const bodyParser = require('body-parser');
const { hash, compare } = require('bcrypt');
const objectID = require('mongoose').Types.ObjectId;
const session = require('express-session');
const CheckPermission = require('../middleware/check');
route.use(bodyParser.urlencoded({
    extended: false
}));

route.post('/sign-up', async(req, res) => {
    const { UserName, Password, FullName, Address, Phone, Permission} = req.body;
    const hashPassword = await hash(Password, 8);
    User.signUp( UserName, hashPassword, FullName, Address, Phone, Permission ).then(result => {
        res.json({result});
    }).catch(err => res.json("Loi " + err.message));
});

route.post('/sign-in', ( req, res ) => {
    const {UserName, Password} = req.body;
        User.signIn(UserName, Password).then( result => {
            req.session.token = result.token;
            res.json(result)
        }).catch(err => {
            res.json(err)
        })
})

route.post('/add-project-post', CheckPermission, (req, res)=>{
    const userId = req.userId;
    console.log(userId)
    if (!userId) res.json({error: 'middleware_is_amt'});
    res.json({message: 'success'});
})

route.get('/get-info-user', CheckPermission, (req, res) => {
    const  userId   = req.userId;
    console.log(userId);
    if (!objectID.isValid(userId))
        res.json({message: "userID not indefine"})
    User.getInfoUser(userId).then(result => {
        res.json({
            message: "sucsess",
            data: result
        })
    }).catch(err => {
        res.json({
            message: "fail",
            data: result
        })
    })
});

route.get('/delete-user/:userId', (req, res) => {
    const { userId }  = req.params;
    if (!objectID.isValid(userId))
        res.json({ message: "userid is not define" })
    User.removeUser( userId ).then( result => {
        res.json({
            message: "success",
            data: result
        })
    }).catch( err => {
        res.json({
            message: "fail",
        })
    })
})

module.exports = route;