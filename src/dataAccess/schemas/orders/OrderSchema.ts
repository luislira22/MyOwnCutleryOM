import * as mongoose from "mongoose";

//TODO - REDO
mongoose.connection.once("open", () => {
    console.log("Connected to mongodb. [USER]");
});

// @ts-ignore
mongoose.connect(process.env.DB_CONNECTION_STRING, {useNewUrlParser: true});

const orderSchema = new mongoose.Schema({
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "client",
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    requestDeliveryDate: {
        type: Date,
        required: true,
    },
    deliveryDate: {
        type: Date,
        required: false,
    },
    status: {
        type: String,
        required: true,
    },
    productID: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('orders',orderSchema);
