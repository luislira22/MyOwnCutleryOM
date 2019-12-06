import mongoose = require("mongoose");

interface OrderDate extends mongoose.Document {
    date: Date
}

export = OrderDate;
