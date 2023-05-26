const responseHandler = require('../Handlers/response.handler')
const tmdbApi = require('../tmdb/tmdb.api')

const personDetail = async (req, res) => {
    try {
        const { personId } = req.params
        const person = await tmdbApi.personDetail({ personId })

        responseHandler.success(res, person)
    } catch {
        responseHandler.error(res)
    }
}


const personMedias = async (req, res) => {
    try {
        const { personId } = req.params
        const person = await tmdbApi.personMedias({ personId })

        responseHandler.success(res, person)
    } catch {
        responseHandler.error(res)
    }
}

module.exports = { personDetail, personMedias }