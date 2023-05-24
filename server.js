require('dotenv/config')

const cors = require('cors');
const connectDB = require('./Services/ConnectDbService');
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express(); 

app.use(cors()); //middleware cors apply all request
app.use(express.json()); // middle ware get info from client by req.body
app.use(express.urlencoded({ extended: false })) 
app.use(cookieParser()) // To interact with cookies


const userRouter = require('./Router/UserRoute');
const authRouter = require('./Router/AuthRoute');

// connect database
connectDB()

// middleware route
app.use('/auth/admin', userRouter);
app.use('/api/auth', authRouter);

app.listen(process.env.PORT_SERVER || 5000, function (params) {
    console.log('running');
})