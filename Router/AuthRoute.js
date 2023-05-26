const express = require('express')
const router = express.Router()

const tokenMiddleware = require('../Middlewares/token.middleware')
const authController = require('../Controllers/AuthController')

router.post('/register', authController.register)

router.post('/login', authController.login)

router.post('/update-password', [
    tokenMiddleware.auth
], authController.updatePassword)

router.get('/info', [
    tokenMiddleware.auth
], authController.getInfo)

module.exports = router