const dotenv = require('dotenv').config({path:__dirname + '/.env'});

// dotenv.config();

module.exports = {
    email: process.env.EMAIL_UNAME,
    pword: process.env.EMAIL_PWORD
};