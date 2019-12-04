import DataAccess = require("./../../dataAccess/DataAccess");
import IOrderModel = require("../../model/orders/interfaces/Order");
import Status = require("../../model/orders/Status");

const mongoose = DataAccess.mongooseInstance;
const mongooseConnection = DataAccess.mongooseConnection;

class OrderSchema {

    static get schema() {
        const ClientSchema = new mongoose.Schema(
            {
                id: {
                    type: Number,
                    required: true,
                }
            }
        )

        const QuantitySchema = new mongoose.Schema(
            {
                quantity: {
                    type: Number,
                    required: true
                }
            }
        )

        const OrderDateSchema = new mongoose.Schema(
            {
               date: {
                    type: Date,
                    required: true,
                }
                }
        )

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
                    type: [ClientSchema],
                    required: true,
                },
                quantity: {
                    type: [QuantitySchema],
                    required: true,
                    unique: true,
                },
                date: {
                    type: [OrderDateSchema],
                    required: true,
                },
                status: {
                    type: [StatusSchema],
                    required: true,
                },
            }
        );
    }
}

const schema = mongooseConnection.model<IOrderModel>("Orders", OrderSchema.schema);
export = schema;

