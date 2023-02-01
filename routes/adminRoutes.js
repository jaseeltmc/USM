const express = require('express');
const admin_route = express();
const session = require('express-session');
const config = require('../config/config');
const bodyParser = require('body-parser');
const adminController = require('../controllers/adminController')
const auth = require('../middleware/adminAuth')

admin_route.use(session({

    secret:config.sessionSecret
}));
admin_route.set('views','./views/admin');
admin_route.set('view engine','ejs')

admin_route.use(bodyParser.json());
admin_route.use(bodyParser.urlencoded({extended:true}));



admin_route.get('/',auth.isLogout,adminController.loadLogin);
admin_route.post('/',adminController.verfyLogin);
admin_route.get('/home',auth.isLogin,adminController.loadDashboard)
admin_route.get('/logout',auth.isLogin,adminController.logout)
// admin_route.get('/dashboard',auth.isLogin,adminController.adminDashboard)
admin_route.get('/addUser',auth.isLogin,adminController.loadUserForm);
admin_route.post('/addUser',adminController.addNewUser);
admin_route.get('/updateUser',adminController.updateUser);
admin_route.post('/updateUser',adminController.updateChanges);
admin_route.get('/deleteUser',adminController.deleteUser)


module.exports = admin_route