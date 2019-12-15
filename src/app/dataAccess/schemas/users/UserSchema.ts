const mongoose = require('mongoose');
import Constants = require("../../../../config/constants/Constants");


//TODO - REDO
const mongooseConnection = mongoose.connection;
console.log("passou aqui");
mongooseConnection.once("open", () => {
    console.log("Connected to mongodb. [USER]");
});

// @ts-ignore
mongoose.connect(Constants.DB_CONNECTION_STRING, {useNewUrlParser: true});

const UserModel = mongoose.model('UserModel', new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
}, {collection: 'users', discriminatorKey: 'role'}));

module.exports = mongoose.model('UserModel');
