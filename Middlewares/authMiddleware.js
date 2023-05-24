const jwt = require('jsonwebtoken');
const UserModel = require('../Models/UserModel')

const isAuthentication = (req, res, next) => {
    try {
        const bearerHeader = req.headers['authorization'];
        const accessToken = bearerHeader.split(' ')[1];
        const decodeJwt = jwt.verify(accessToken, process.env.SECRET_JWT);
        req.userId = decodeJwt._id
        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError)
            return res.status(401).send('Token Expired');
        return res.status(401).send('Authentication not valid');
    }
}

const isAdmin = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.userId)
        console.log(user.role);
        if (user.role === 'admin') {
            next()
        } else {
            throw new error
        }
    } catch (error) {
        return res.status(401).send('You are not an administrator');
    }
}

module.exports = {
    isAuthentication,
    isAdmin
}