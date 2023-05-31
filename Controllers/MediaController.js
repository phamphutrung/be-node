const tmdbApi = require('../tmdb/tmdb.api')
const responseHandler = require('../Handlers/response.handler')
const userModel = require('../Models/UserModel')
const favoriteModel = require('../Models/FavoriteModel')
const reviewModel = require('../Models/ReviewModel')
const tokenMiddleware = require('../Middlewares/token.middleware')

const getList = async (req, res) => {
    try {
        const { page } = req.query
        const { mediaType, mediaCategory } = req.params

        const response = await tmdbApi.mediaList({ mediaType, mediaCategory, page })

        return responseHandler.success(res, response)
    } catch (error) {
        return responseHandler.error(res, error.message)
    }
}

const getGenres = async (req, res) => {
    try {
        const { mediaType } = req.params        
        const response = await tmdbApi.mediaGenres({ mediaType })

        return responseHandler.success(res, response)
    } catch (error) {
        return responseHandler.error(res, error.message)
    }
}

const search = async (req, res) => {
    try {
        const { mediaType } = req.params
        const { query, page } = req.query

        const response = await tmdbApi.mediaSearch({
            query, page,
            mediaType: mediaType === 'people' ? 'person' : mediaType
        })

        return responseHandler.success(res, response)

    } catch (error) {
    }
}

const getDetail = async (req, res) => {
    try {
        const { mediaType, mediaId } = req.params

        const params = { mediaType, mediaId }

        const media = await tmdbApi.mediaDetail(params)

        media.credits = await tmdbApi.mediaCredits(params)

        const videos = await tmdbApi.mediaVideos(params)
        media.videos = videos

        const recommend = await tmdbApi.mediaRecommend(params)
        media.recommend = recommend.result
        media.images = await tmdbApi.mediaImages(params)

        const tokenDecode = tokenMiddleware.tokenDecode(req)

        if (tokenDecode) {
            const user = await userModel.findById(tokenDecode.data)

            if (user) {
                const isFavorite = await favoriteModel.findOne({ user: user.id, mediaId })
                media.isFavorite = isFavorite !== null
            }
        }

        media.review = await reviewModel.find({ mediaId }).populate('user').sort('-createAt')

        return responseHandler.success(res, media)
    } catch (error) {
        return responseHandler.error(res, error.message)
    }
}

module.exports = {
    getList, getGenres, search, getDetail
}