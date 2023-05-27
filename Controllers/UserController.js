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
        responseHandler.error(req, error.message)
    }
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body

        const user = await userModel.findOne({ username: username }).select("username password salt id displayName");

        if (!user) return responseHandler.badRequest(res, "Account does not exist")
        if (!user.validPassword(password)) return responseHandler.badRequest(res, "Incorrect password")

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
        responseHandler.error(req, error.message)
    }
}

const updatePassword = async (req, res) => {
    try {
        const { password, newPassword } = req.body
        const user = await userModel.findById(req.user.id).select("password id salt")

        if (!user.validPassword(password)) return responseHandler.badRequest(res, "Incorrect password")
        user.setPassword(newPassword)
        await user.save()

        return responseHandler.success(res)
    } catch (error) {
        responseHandler.error(res, error.message)
    }
}

const getInfo = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id)

        if (!user) return responseHandler.notFound(res)

        return responseHandler.success(res, user)
    } catch (error) {
        responseHandler.error(res, error.message)
    }
}

module.exports = {
    register,
    login,
    updatePassword,
    getInfo
}