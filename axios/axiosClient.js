const axios = require('axios')

const get = async (url) => {
    const res = await axios.get(url)
    return res.data
}

module.exports = { get }