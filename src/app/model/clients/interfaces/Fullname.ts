import mongoose = require("mongoose");

interface Fullname extends mongoose.Document {
    firstname: string
    lastname: string
}

export = Fullname;
