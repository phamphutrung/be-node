const jwt = require('jsonwebtoken');

const UserModel = require('../Models/UserModel')
const responseHandler = require('../Handlers/response.handler')

const tokenDecode = (res) => {
    try {
        const bearerHeader = res.headers['authorization'];
        if (bearerHeader) {
            const accessToken = bearerHeader.split(' ')[1];

            return jwt.verify(accessToken, process.env.SECRET_JWT)
        }

        return false
    } catch (error) {
        return false
    }
}

const auth = async (req, res, next) => {
    const tokenDecoded = tokenDecode(req);

    if (!tokenDecoded) return responseHandler.unauthorized(res);
    const user = await UserModel.findOne(tokenDecoded.data);
    
    if (!user) return responseHandler.unauthorized(res);
    
    req.user = user;
    next();
};

module.exports = { tokenDecode, auth }