import mongoose = require("mongoose");

interface Client extends mongoose.Document {
    name: string
    address: string
    email: string
    password: string
}

export = Client;
