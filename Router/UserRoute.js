const { body } = require("express-validator");
const express = require('express')

const requestHandler = require('../Handlers/request.handler')
const tokenMiddleware = require('../Middlewares/token.middleware')
const authController = require('../Controllers/AuthController')
const userModel = require('../Models/UserModel')

const router = express.Router()

router.post('/register',

    [
        body("username").isLength({ min: 4 }).withMessage("username minimum characters")
            .custom(async value => {
                const user = await userModel.findOne({ username: value });
                if (user) return Promise.reject("username already used");
            }),
        body("password").isLength({ min: 6 }).withMessage("password minimum characters"),
        body("displayName").isLength({ min: 4 }).withMessage("display name minimum characters"),
        requestHandler.validate,
        authController.register
    ]
)

router.post('/login',
    [
        body("username").isLength({ min: 4 }).withMessage("username minimum characters"),
        body("password").isLength({ min: 6 }).withMessage("password minimum characters"),
        requestHandler.validate,
        authController.login
    ],
)

router.put('/update-password',
    [
        body("password").exists().withMessage("password is required").isLength({ min: 6 }).withMessage("password minimum characters"),
        body("newPassword").isLength({ min: 6 }).withMessage("new password minimum characters"),
        requestHandler.validate,
        tokenMiddleware.auth,
        authController.updatePassword
    ]
)

router.get('/info',
    [
        tokenMiddleware.auth,
        authController.getInfo
    ]
)

router

module.exports = router