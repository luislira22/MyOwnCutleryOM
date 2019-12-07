import mongoose = require("mongoose");

export default interface Quantity extends mongoose.Document {
    quantity: number
}
