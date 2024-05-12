const express = require('express');
const router = express.Router();
const Login = require('../Controller/Login.controller.js'); 
const getuser = require('../Controller/GetUserProfile.controller.js');
const signup = require('../Controller/Signup.controller.js');

router.route('/signup').post(signup);
// router.route('/').post(login);
router.route('/getuser').get(getuser);
router.route('/login').post(Login);
module.exports = router;    
