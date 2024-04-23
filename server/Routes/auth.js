const express = require('express');
const router = express.Router();
const { register,login,currentUser,loginLine,loginFacebook } = require('../Controllers/AuthControllers');
const { auth,adminCheck } = require('../Middlewares/AuthMiddlewares')

router.post('/register',register)
router.post('/login',login)
router.post('/login-line',loginLine)
router.post('/login-facebook',loginFacebook)
router.post('/current-user',auth,currentUser)
router.post('/current-admin',auth,adminCheck,currentUser)


module.exports = router