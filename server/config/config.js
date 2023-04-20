const dotenv = require('dotenv');
dotenv.config();

const config = {
    development : {
        host : process.env.DB_HOST,
        user : process.env.DB_USERNAME,
        password : process.env.DB_PASSWORD,
        database : process.env.DB_NAME
    }
}

module.exports = config;