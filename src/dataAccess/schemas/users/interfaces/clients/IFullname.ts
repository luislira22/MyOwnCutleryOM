import mongoose = require("mongoose");

export default interface IFullname extends mongoose.Document {
    firstname: string
    lastname: string
}
