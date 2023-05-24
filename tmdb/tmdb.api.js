import axiosClient from "../axios/axiosClient";
import tmdbEndpoint from "./tmdbEndpoint";

const tmdbApi = () => {
    mediaList: async ({ mediaType, mediaCategory, page }) => await axiosClient.get(tmdbEndpoint.mediaList({ mediaType, mediaCategory, page }))
    mediaDetail: async ({ mediaType, mediaCategory }) => await axiosClient.get(tmdbEndpoint.mediaDetail(`${mediaType}/${mediaCategory}`))
    mediaCredits: async ({ mediaType, mediaId }) => await axiosClient.get(tmdbEndpoint.mediaCredits(`${mediaType}/${mediaId}/credits`))
    mediaVideos: async ({ mediaType, mediaId }) => await axiosClient.get(tmdbEndpoint.mediaVideos(`${mediaType}/${mediaId}/videos`))
    mediaRecommend: async ({ mediaType, mediaId }) => await axiosClient.get(tmdbEndpoint.mediaRecommend(`${mediaType}/${mediaId}/recommendations`))
    mediaImages: async ({ mediaType, mediaId }) => await axiosClient.get(tmdbEndpoint.mediaImages(`${mediaType}/${mediaId}/images`))
    mediaSearch: async ({ mediaType, query, page }) => await axiosClient.get(tmdbEndpoint.mediaSearch(`search/${mediaType}`, { query, page }))
    personMedias: async ({ personId }) => await axiosClient.get(tmdbEndpoint.personMedias(`person/${personId}/combined_credits`))
}

export default tmdbApi