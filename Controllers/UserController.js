const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const userModel = require('../Models/UserModel');
const UserModel = require('../Models/UserModel');

async function getList(req, res) {
    try {
        const users = await userModel.find()
        res.status(200).send(users)
    } catch (error) {

    }
}

async function create(req, res) {
    try {
        const { username, password, email } = req.body
        await userModel.create({
            username: username,
            password: bcrypt.hashSync(password, 10),
            email: email,
            role: 'regular'
        })
        return res.status(200).send('Create successfully')
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function deleteUser(req, res) {
    try {
        const { id } = req.params
        console.log(id);
        const deletedUser = await UserModel.findByIdAndDelete(id);
        if (deletedUser) {
            return res.status(201).send('Delete successfully');
        } else {
            return res.status(404).send({ message: 'User not found' });
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = {
    getList,
    create,
    deleteUser
}
