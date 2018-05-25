
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');

app.use(session({
    secret: 'asdasfdaf236256asda1',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 30000
    }
}));
//const cors = require('cors');
const bodyParser = require('body-parser').urlencoded({
    extended: false
});

process.on('warning', warning => {
    console.log(warning.stack);
})

const postRouter = require('./routing/post.router');
const categoryRouter = require('./routing/Category.router');
const userRouter = require('./routing/User.router')
const addressRouter =  require('./routing/Address.router')
app.use(bodyParser);

app.use('/post', postRouter);
app.use('/category', categoryRouter);
app.use('/user', userRouter);
app.use('/address', addressRouter);
const uri = 'mongodb://localhost/DACS2';

mongoose.connect(uri);
mongoose.connection.once('open', ()=>{
    app.listen(3000, ()=>{
        console.log('Server started at port 3000');
    });
});
