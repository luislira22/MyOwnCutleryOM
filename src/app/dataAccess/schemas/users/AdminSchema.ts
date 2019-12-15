import * as mongoose from "mongoose";

const UserModel = require("./UserSchema");

const AdminModel = UserModel.discriminator('admin', new mongoose.Schema({}));

module.exports = mongoose.model('admin');
