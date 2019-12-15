const mongoose = require('mongoose');
const bcrypt = require ("bcrypt");
const config = require('../../../config/config');

//TODO - REDO
const mongooseConnection = mongoose.connection;
mongooseConnection.once("open", () => {
    console.log("Connected to mongodb. [USER]");
});

// @ts-ignore
mongoose.connect(process.env.DB_CONNECTION_STRING, {useNewUrlParser: true});

const userSchema = new mongoose.Schema({
    email: {
        type: String,
            required: true,
            unique: true,
    },
    password: {
        type: String,
            required: true,
    }
},{collection: 'users', discriminatorKey: 'role'});

userSchema.pre('save', function(next) {
    const user = this;
    if(!user.isModified || !user.isNew) { // don't rehash if it's an old user
        next();
    } else {
        bcrypt.hash(user.password, config.settings.saltingRounds, function(err, hash) {
            if (err) {
                console.log('Error hashing password for user', user.email);
                next(err);
            } else {
                user.password = hash;
                next();
            }
        });
    }
});

module.exports = mongoose.model('UserModel',userSchema);
