const express = require('express')
const router = express.Router()

const authMiddleware = require('../Middlewares/authMiddleware')
const userController = require('../Controllers/User1Controller')

router.get('/user', [
    authMiddleware.isAuthentication,
], userController.getList)

router.post('/user', [
    authMiddleware.isAuthentication,
    authMiddleware.isAdmin,
], userController.create)

router.delete('/user/:id', [
    authMiddleware.isAuthentication,
    authMiddleware.isAdmin,
], userController.deleteUser)


module.exports = router