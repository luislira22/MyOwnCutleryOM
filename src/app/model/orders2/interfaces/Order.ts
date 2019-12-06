import mongoose = require("mongoose");
import Client = require("../../clients/interfaces/Client");
import Quantity = require("./Quantity");
import OrderDate = require("./OrderDate");
import Status = require("./Status");

interface Order extends mongoose.Document {
    client: Client;
    quantity: Quantity;
    date: OrderDate;
    status: Status;
    productID: string;
}

export = Order;
