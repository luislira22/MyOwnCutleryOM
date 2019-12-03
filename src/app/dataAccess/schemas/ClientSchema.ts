import DataAccess = require("./../../dataAccess/DataAccess");
import IClientModel = require("../../model/clients/interfaces/Client");

const mongoose = DataAccess.mongooseInstance;
const mongooseConnection = DataAccess.mongooseConnection;

class ClientSchema {

    static get schema() {
        const FullnameSchema = new mongoose.Schema(
            {
                firstname: {
                    type: String,
                    required: true,
                },
                lastname: {
                    type: String,
                    required: true,
                }
            }
        )

        const EmailSchema = new mongoose.Schema(
            {
                email: {
                    type: String,
                    required: true
                }
            }
        )

        const AddressSchema = new mongoose.Schema(
            {
                address: {
                    type: String,
                    required: true,
                },
                postalcode: {
                    type: String,
                    required: true,
                },
                city: {
                    type: String,
                    required: true,
                },
                country: {
                    type: String,
                    required: true,
                }
            }
        )

        return new mongoose.Schema(
            {
                name: {
                    type: [FullnameSchema],
                    required: true,
                },
                email: {
                    type: [EmailSchema],
                    required: true,
                    unique: true,
                },
                address: {
                    type: [AddressSchema],
                    required: true,
                },
                password: {
                    type: String,
                    required: true,
                },
            }
        );
    }
}

const schema = mongooseConnection.model<IClientModel>("Clients", ClientSchema.schema);
export = schema;
