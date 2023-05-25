const jsonwebtoken = require('jsonwebtoken');
const userModel = require('../Models/UserModel');
const responseHandler = require('../Handlers/response.handler')

const register = async (req, res) => {
    try {
        const { username, password, displayName } = req.body

        const checkUser = await userModel.findOne({ username })

        if (checkUser) return responseHandler.badRequest(res, "Username already used")

        const user = new userModel()

        user.username = username
        user.displayName = displayName
        user.setPassword(password)
        await user.save()

        const token = jsonwebtoken.sign({
            id: user.id
        }, process.env.SECRET_JWT, {
            expiresIn: 36000
        })
        const data = {
            token,
            ...user._doc,
            id: user.id
        }

        responseHandler.created(res, data)
    } catch (error) {
        responseHandler.error(req)
    }
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body

        const user = await userModel.findOne({ username: username }).select("username password salt id displayName");
        
        if(!user) return responseHandler.badRequest(res, "Account does not exist")
        if(!user.validPassword(password)) return responseHandler.badRequest(res, "Incorrect password")

       
        const token = jsonwebtoken.sign({
            id: user.id
        }, process.env.SECRET_JWT, {
            expiresIn: 36000
        })
        user.password = undefined
        user.salt = undefined
        const data = {
            token,
            ...user._doc,
            id: user.id
        }

        responseHandler.created(res, data)
    } catch (error) {
        responseHandler.error(req)
    }
}

module.exports = {
    register,
    login
}