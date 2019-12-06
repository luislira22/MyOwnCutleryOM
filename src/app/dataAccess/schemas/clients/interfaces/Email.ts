import mongoose = require("mongoose");

export default interface Email extends mongoose.Document {
    email: string
}
