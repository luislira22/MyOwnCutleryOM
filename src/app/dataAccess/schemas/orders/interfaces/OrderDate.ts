import mongoose = require("mongoose");

export default interface OrderDate extends mongoose.Document {
    date: Date
}
