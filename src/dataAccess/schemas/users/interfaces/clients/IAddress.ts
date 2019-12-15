import mongoose = require("mongoose");

export default interface IAddress extends mongoose.Document {
    address: string
    postalcode: string
    city: string
    country: string
}
