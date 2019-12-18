import * as mongoose from "mongoose";

export default interface IOrderModel extends mongoose.Document {
    id: string;
    client: string;
    quantity: number;
    date: Date;
    requestDeliveryDate: Date;
    deliveryDate: Date;
    status: string;
    productID: string;
}
