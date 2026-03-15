const express = require('express')
const authController = require('../controller/auth.controller')
const {validateLogin,validateRegister}=require('../middleware/auth.middleware')


const router = express.Router();


router.post('/register',validateRegister,authController.registerUser)
router.post('/login',validateLogin,authController.loginUser)
router.post('/logout',authController.logOutUser)
module.exports=router;  