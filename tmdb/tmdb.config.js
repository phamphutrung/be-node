const getUrl = (endpoint, params) => {
    const qs = new URLSearchParams(params)
    
    return `${process.TMDB_BASE_URL}${endpoint}?key_api=${process.KEY}&${qs}`
}

export default {getUrl}