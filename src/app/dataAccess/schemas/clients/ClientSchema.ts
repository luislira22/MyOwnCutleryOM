import DataAccess = require("../../DataAccess");
import IClient from './interfaces/Client'
import mongoose = require("mongoose");
import Constants = require("../../../../config/constants/Constants");

/*const mongoose = DataAccess.mongooseInstance;
const mongooseConnection = DataAccess.mongooseConnection;

*/
const mongooseConnection = mongoose.connection;
mongooseConnection.once("open", () => {
    console.log("Connected to mongodb. [CLIENT]");
});

// @ts-ignore
mongoose.connect(Constants.DB_CONNECTION_STRING, {useNewUrlParser: true});

class ClientSchema {
    static get schema() {
        const RoleSchema = new mongoose.Schema(
            {
                role: {
                    type: String,
                    required: true
                }
            }, {_id: false}
        );

        const NIFSchema = new mongoose.Schema(
            {
                nif: {
                    type: Number,
                    required: true
                }
            }, {_id: false}
        )

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
            }, {_id: false}
        );

        const EmailSchema = new mongoose.Schema(
            {
                email: {
                    type: String,
                    required: true,
                    unique: true
                }
            }, {_id: false}
        );

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
            }, {_id: false}
        );

        return new mongoose.Schema(
            {
                name: {
                    type: FullnameSchema,
                    required: true,
                },
                email: {
                    type: EmailSchema,
                    required: true,
                    unique: true,
                },
                address: {
                    type: AddressSchema,
                    required: true,
                },
                nif: {
                    type: NIFSchema,
                    required: true,
                },
                role:  {
                    type: RoleSchema,
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

const schema = mongooseConnection.model<IClient>("Clients", ClientSchema.schema);
export default schema;
