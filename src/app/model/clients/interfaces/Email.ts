import mongoose = require("mongoose");

interface Email extends mongoose.Document {
    email: string
}

export = Email;
