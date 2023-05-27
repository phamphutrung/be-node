const tmdbConfig = require("./tmdb.config")

const tmdbEndpoint = () => {
    mediaList: ({ mediaType, mediaCategory, page }) => tmdbConfig.getUrl(`${mediaType}/${mediaCategory}`, page)
    mediaDetail: ({ mediaType, mediaCategory }) => tmdbConfig.getUrl(`${mediaType}/${mediaCategory}`)
    mediaCredits: ({ mediaType, mediaId }) => tmdbConfig.getUrl(`${mediaType}/${mediaId}/credits`)
    mediaVideos: ({ mediaType, mediaId }) => tmdbConfig.getUrl(`${mediaType}/${mediaId}/videos`)
    mediaRecommend: ({ mediaType, mediaId }) => tmdbConfig.getUrl(`${mediaType}/${mediaId}/recommendations`)
    mediaImages: ({ mediaType, mediaId }) => tmdbConfig.getUrl(`${mediaType}/${mediaId}/images`)
    mediaSearch: ({ mediaType, query, page }) => tmdbConfig.getUrl(`search/${mediaType}`, { query, page })
    personMedias: ({ personId }) => tmdbConfig.getUrl(`person/${personId}/combined_credits`)
}


module.exports = tmdbEndpoint