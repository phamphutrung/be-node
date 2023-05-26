const responseHandler = require('../Handlers/response.handler')
const reviewModel = require('../Models/ReviewModel')

const create = async (req, res) => {
    try {
        const { movieId } = req.params

        const review = new reviewModel({
            user: req.user.id,
            movieId,
            ...req.body
        })
        await review.save()

        responseHandler.created(res, {
            ...review._doc,
            id: review.id,
            user: req.user
        })
    } catch (error) {
        responseHandler.error(res, error.message)
    }
}

const remove = async (req, res) => {
    try {
        const { reviewId } = req.params

        const review = await reviewModel.findOne({
            user: req.user.id,
            _id: reviewId
        })

        if (!review) return responseHandler.notFound(res)

        await review.remove()

        responseHandler.success(res)

    } catch (error) {
        responseHandler.error(res, error.message)
    }
}

const getReviewsOfUser = async (req, res) => {
    try {
        const reviews = await reviewModel.find({ user: req.user.id }).sort("-createdAt")

        responseHandler.success(res, reviews)
    } catch (error) {
        responseHandler.error(res, error.message)
    }
}

module.exports = { create, remove, getReviewsOfUser }