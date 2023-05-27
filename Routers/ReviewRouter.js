const { body } = require("express-validator");
const express = require('express')

const reviewController = require('../Controllers/ReviewController')
const authMiddleware = require('../Middlewares/token.middleware')
const requestHandler = require('../Handlers/request.handler')

const router = express.Router()

router.get('/',
    [
        authMiddleware.auth,
        reviewController.getReviewsOfUser
    ]
)

router.post('/',
    [
        authMiddleware.auth,
        body('content').exists().withMessage("content is required"),
        body('mediaType').exists().withMessage("media type is required"),
        body('mediaId').exists().withMessage("media id is required"),
        body('mediaTitle').exists().withMessage("media title is required"),
        body('mediaPoster').exists().withMessage("media poster is required"),
        requestHandler.validate,
        reviewController.create
    ]
)

router.delete('/:movieId',
    [
        authMiddleware.auth,
        reviewController.remove
    ]
)

module.exports = router

