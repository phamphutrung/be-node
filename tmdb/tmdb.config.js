const getUrl = (endpoint, params) => {
    const qs = new URLSearchParams(params)
    
    return `${process.env.TMDB_BASE_URL}${endpoint}?api_key=${process.env.TMDB_KEY}&${qs}`
}

module.exports  = {getUrl}