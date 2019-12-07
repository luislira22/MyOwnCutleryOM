import mongoose = require("mongoose");
import Client from "../../clients/interfaces/Client";
import Quantity from "./Quantity";
import OrderDate from "./OrderDate";
import Status from "./Status";

export default interface Order extends mongoose.Document {
    client: Client;
    quantity: Quantity;
    date: OrderDate;
    status: Status;
    productID: string;
}
