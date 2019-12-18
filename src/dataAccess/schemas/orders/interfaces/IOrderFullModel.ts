import * as mongoose from "mongoose";
import IClientModel from "../../users/interfaces/clients/IClientModel";

export default interface IOrderModel extends mongoose.Document {
    id: string;
    client: IClientModel;
    quantity: number;
    date: Date;
    requestDeliveryDate: Date;
    deliveryDate: Date;
    status: string;
    productID: string;
}
