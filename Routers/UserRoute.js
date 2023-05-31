const { body } = require("express-validator");
const express = require('express')

const requestHandler = require('../Handlers/request.handler')
const tokenMiddleware = require('../Middlewares/token.middleware')
const userController = require('../Controllers/UserController')
const favoriteController = require('../Controllers/FavoriteController')


const router = express.Router()

router.post('/register',

    [
        body("username").isLength({ min: 4 }).withMessage("username minimum characters"),
        body("password").isLength({ min: 6 }).withMessage("password minimum characters"),
        body("displayName").isLength({ min: 4 }).withMessage("display name minimum characters"),
        body("confirmPassword").exists().withMessage("confirm password is required").isLength({ min: 6 }).withMessage("confirm password minimum characters")
            .custom((value, { req }) => {
                if (value !== req.body.password) throw new Error('confirm password not match')
                return true
            }),
        requestHandler.validate,
        userController.register
    ]
)

router.post('/login',
    [
        body("username").isLength({ min: 4 }).withMessage("username minimum characters"),
        body("password").isLength({ min: 6 }).withMessage("password minimum characters"),
        requestHandler.validate,
        userController.login
    ],
)

router.put('/update-password',
    [
        tokenMiddleware.auth,
        body("password").exists().withMessage("password is required").isLength({ min: 6 }).withMessage("password minimum characters"),
        body("newPassword").exists().withMessage("new password is required").isLength({ min: 6 }).withMessage("new password minimum characters"),
        body("confirmPassword").exists().withMessage("confirm password is required").isLength({ min: 6 }).withMessage("confirm password minimum characters")
            .custom((value, { req }) => {
                if (value !== req.body.newPassword) throw new Error('confirm password not match')
                return true
            }),
        requestHandler.validate,
        userController.updatePassword
    ]
)

router.get('/info',
    [
        tokenMiddleware.auth,
        userController.getInfo
    ]
)

router.get('/favorites',
    [
        tokenMiddleware.auth,
        favoriteController.getFavoritesOfUser
    ]
)

router.post('/favorites',
    [
        tokenMiddleware.auth,
        body('mediaType').exists().withMessage('media type is required')
            .custom(type => ["movie", "tv"].includes(type)).withMessage('media type is required'),
        body('mediaId').exists().withMessage('media id is required'),
        body('mediaTitle').exists().withMessage('media title is required'),
        body('mediaPoster').exists().withMessage('media poster is required'),
        body('mediaRate').exists().withMessage('media rate is required'),
        requestHandler.validate,
        favoriteController.create
    ]
)

router.delete('/favorites/:favoriteId',
    [
        tokenMiddleware.auth,
        favoriteController.remove
    ]
)

module.exports = router