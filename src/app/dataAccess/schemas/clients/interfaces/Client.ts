import mongoose = require("mongoose");
import Fullname from "./Fullname";
import Address from "./Address";
import Email from "./Email";

export default interface Client extends mongoose.Document {
    name: Fullname
    address: Address
    email: Email
    password: string
}
