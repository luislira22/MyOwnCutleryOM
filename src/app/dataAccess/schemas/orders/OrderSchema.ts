import DataAccess = require("../../DataAccess");
import IOrderModel from "./interfaces/Order";
import * as mongoose from "mongoose";
import Constants = require("../../../../config/constants/Constants");

/*const mongoose = DataAccess.mongooseInstance;
const mongooseConnection = DataAccess.mongooseConnection;
*/

const mongooseConnection = mongoose.connection;
mongooseConnection.once("open", () => {
    console.log("Connected to mongodb. [ORDER]");
});

// @ts-ignore
mongoose.connect(Constants.DB_CONNECTION_STRING, {useNewUrlParser: true});

class OrderSchema {

    static get schema() {

        const QuantitySchema = new mongoose.Schema(
            {
                quantity: {
                    type: Number,
                    required: true
                }
            },{ _id : false }
        );

        const OrderDateSchema = new mongoose.Schema(
            {
                date: {
                    type: Date,
                    required: true,
                }
            },{ _id : false }
        );

        const StatusSchema = new mongoose.Schema(
            {
                status: {
                    type: String,
                    required: true,
                }
            },{ _id : false }
        );

        return new mongoose.Schema(
            {
                client: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Clients",
                    required: true,
                },
                quantity: {
                    type: QuantitySchema,
                    required: true,
                },
                date: {
                    type: OrderDateSchema,
                    required: true,
                },
                status: {
                    type: StatusSchema,
                    required: true,
                },
                productID: {
                    type: String,
                    required: true,
                }
            }
        );
    }
}

const schema = mongooseConnection.model<IOrderModel>("Orders", OrderSchema.schema);
export = schema;

