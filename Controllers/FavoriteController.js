const responseHandler = require('../Handlers/response.handler')
const favoriteModel = require('../Models/FavoriteModel')

const create = async (req, res) => {
    try {
        const isFavorite = favoriteModel.findOne({ user: req.user.id, mediaId: req.body.id })

        if (!isFavorite) return responseHandler.error(res)

        const favorite = new favoriteModel({
            ...req.body,
            user: req.user.id
        })
        await favorite.save()

        return responseHandler.created(res, favorite)
    } catch (error) {
        return responseHandler.error(error.message)
    }
}

const remove = async (req, res) => {
    try {
        const { favoriteId } = req.params
        const favorite = await favoriteModel.findOne({
            user: req.user.id,
            _id: favoriteId
        })
        
        if(!favorite) return responseHandler.notFound(res)
        
        await favorite.remove()

        responseHandler.success(res)

    } catch (error) {
        return responseHandler.error(error.message)
    }
}

const getFavoritesOfUser = async (req, res) => {
    try {
        const favorites = await favoriteModel.find({user: req.user.id}).sort("-createdAt")

        responseHandler.success(res, favorites)
    } catch (error) {
        responseHandler.error(res, error.message)
    }
}

module.exports = {
    getFavoritesOfUser, remove, create
}