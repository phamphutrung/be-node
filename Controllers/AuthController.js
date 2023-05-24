const userModel = require('../Models/UserModel');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const { username, password, email } = req.body
        await userModel.create({
            username: username,
            password: bcrypt.hashSync(password, 10),
            email: email,
            role: 'regular'
        })
        console.log('success register');
        return res.status(200).send('register here')
    } catch (error) {
        console.log('error: ' + error);
        return res.status(402).send('register failed: ' + error)
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email: email });

        if (!user) {
            return res.status(400).send('Invalid email or password')
        }
        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(400).send('Login failed')
        }

        const jwt = jsonwebtoken.sign({
            _id: user.id,
            username: user.username,
            email: user.email,
            role: user.role
        }, process.env.SECRET_JWT, {
            expiresIn: 36000
        })

        return res.status(200).send({
            accessToken: jwt
        });
    } catch (error) {
        console.log('error: ' + error);
        return res.status(402).send('login failed: ' + error)
    }
}

module.exports = {
    register,
    login
}