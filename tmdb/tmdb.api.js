const axiosClient = require("../axios/axiosClient")
const tmdbEndpoint = require("./tmdbEndpoint");

const tmdbApi = {
    mediaList: async ({ mediaType, mediaCategory, page }) => await axiosClient.get(tmdbEndpoint.mediaList({ mediaType, mediaCategory, page })),
    mediaDetail: async ({ mediaType, mediaId }) => await axiosClient.get(tmdbEndpoint.mediaDetail({mediaType, mediaId})),
    mediaGenres: async ({mediaType}) => await axiosClient.get(tmdbEndpoint.mediaGenres({mediaType})),
    mediaCredits: async ({ mediaType, mediaId }) => await axiosClient.get(tmdbEndpoint.mediaCredits({mediaType,mediaId})),
    mediaVideos: async ({ mediaType, mediaId }) => await axiosClient.get(tmdbEndpoint.mediaVideos({mediaType,mediaId})),
    mediaRecommend: async ({ mediaType, mediaId }) => await axiosClient.get(tmdbEndpoint.mediaRecommend({mediaType,mediaId})),
    mediaImages: async ({ mediaType, mediaId }) => await axiosClient.get(tmdbEndpoint.mediaImages({mediaType,mediaId})),
    mediaSearch: async ({ mediaType, query, page }) => await axiosClient.get(tmdbEndpoint.mediaSearch({ mediaType, query, page })),
    personMedias: async ({ personId }) => await axiosClient.get(tmdbEndpoint.personMedias({personId}))
}

module.exports = tmdbApi