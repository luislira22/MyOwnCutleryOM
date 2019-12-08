import mongoose = require("mongoose");

export default interface NIF extends mongoose.Document {
    nif: number
}
