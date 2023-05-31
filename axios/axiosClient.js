const axios = require('axios')

const get = async (url) => {
    const res = await axios.get(url, {
        headers: {
            Accept: 'application/json',
            "Accept-Encoding": "identify"
        }
    })
    return res.data
}

module.exports = { get }