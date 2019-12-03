import mongoose = require("mongoose");
import Fullname = require("./Fullname");
import Address = require("./Address");
import Email = require("./Email");

interface Client extends mongoose.Document {
    name: Fullname
    address: Address
    email: Email
    password: string
}

export = Client;
