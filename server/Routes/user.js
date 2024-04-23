const express = require('express');
const router = express.Router();
const { list, changeRole } = require('../Controllers/UserControllers');
const { auth,adminCheck } = require('../Middlewares/AuthMiddlewares')

router.get('/user',auth,adminCheck,list)
router.post('/change-role',auth,adminCheck,changeRole)


module.exports = router