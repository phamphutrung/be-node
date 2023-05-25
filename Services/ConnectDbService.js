const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

async function connectDatabase() {
    try {
        await mongoose.connect(`mongodb://localhost:${process.env.PORT_MONGO}/${process.env.DATABASE_NAME}`)
        console.log('connected db');
    } catch (error) {
        console.log('connect database error ' + error);
        process.exit(1)
    }
}

module.exports = connectDatabase;