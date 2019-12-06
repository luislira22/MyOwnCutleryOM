import mongoose = require("mongoose");

export default interface Address extends mongoose.Document {
    address: string
    postalcode: string
    city: string
    country: string
}
