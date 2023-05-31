const cors = require('cors');
const connectDB = require('./Services/ConnectDbService');
const express = require('express');
const cookieParser = require('cookie-parser');
const routers = require('./Routers');

const app = express(); 
require('dotenv').config();
app.use(cors()); //middleware cors apply all request
app.use(express.json()); // middle ware get info from client by req.body
app.use(express.urlencoded({ extended: false })) 
app.use(cookieParser()) // To interact with cookies





// connect database
connectDB()

// middleware routers
app.use('/api/v1/', routers);

app.listen(process.env.PORT_SERVER || 5000, function (params) {
    console.log('running is port ' + process.env.PORT_SERVER);
})