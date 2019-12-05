import DataAccess = require("./../../dataAccess/DataAccess");
import IOrderModel = require("../../model/orders/interfaces/Order");
import Status = require("../../model/orders/Status");

const mongoose = DataAccess.mongooseInstance;
const mongooseConnection = DataAccess.mongooseConnection;

class OrderSchema {

    static get schema() {

        const QuantitySchema = new mongoose.Schema(
            {
                quantity: {
                    type: Number,
                    required: true
                }
            }
        );

        const OrderDateSchema = new mongoose.Schema(
            {
                date: {
                    type: Date,
                    required: true,
                }
            }
        );

        const StatusSchema = new mongoose.Schema(
            {
                status: {
                    type: String,
                    required: true,
                }
            }
        );

        return new mongoose.Schema(
            {
                client: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Clients",
                    required: true,
                },
                quantity: {
                    type: [QuantitySchema],
                    required: true,
                },
                date: {
                    type: [OrderDateSchema],
                    required: true,
                },
                status: {
                    type: [StatusSchema],
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

