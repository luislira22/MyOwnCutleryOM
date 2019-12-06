import mongoose = require("mongoose");

export default interface Fullname extends mongoose.Document {
    firstname: string
    lastname: string
}
