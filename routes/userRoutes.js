const express = require('express');
const user_route = express();
const bodyParser = require('body-parser')
const session =require('express-session')
const config = require('../config/config')
const auth = require("../middleware/auth")
const nocache = require('nocache');


user_route.use(session({

    secret:config.sessionSecret,
    saveUninitialized:true,
    cookie: {maxAge:100000},
    resave: false
}));

user_route.use(nocache());

user_route.use(bodyParser.json())
user_route.use(bodyParser.urlencoded({extended:true}))
user_route.set('view engine','ejs');
user_route.set('views','./views/users')

const userController = require('../controllers/userController');

user_route.get('/register',auth.isLogout,userController.loadRegister);
user_route.post('/register',userController.addUser)
user_route.get('/',auth.isLogout,userController.loginLoad);
user_route.get('/login',auth.isLogout,userController.loginLoad);
user_route.post('/login',userController.verifyLogin)
user_route.get('/home',auth.isLogin,userController.loadHome)
user_route.get('/logout',userController.userLogout)
module.exports = user_route