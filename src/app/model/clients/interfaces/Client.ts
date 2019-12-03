import mongoose = require("mongoose");
import Fullname = require("./Fullname");

interface Client extends mongoose.Document {
    name: Fullname
    address: string
    email: string
    password: string
}

export = Client;
