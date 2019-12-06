import mongoose = require("mongoose");

interface Quantity extends mongoose.Document {
    quantity: number
}

export = Quantity;
