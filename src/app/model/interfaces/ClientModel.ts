import mongoose = require("mongoose");

interface ClientModel extends mongoose.Document {
    name: string
    address: string
    email: string
    password: string
}

export = ClientModel;
