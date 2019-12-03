import DataAccess = require("./../../dataAccess/DataAccess");
import IClientModel = require("../../model/interfaces/Client");

var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;

class ClientSchema {

    static get schema() {
        return mongoose.Schema({
            name: {
                type: String,
                required: true
            },
            address: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            },
            password: {
                type: String,
                required: true
            },
        });
    }

}

var schema = mongooseConnection.model<IClientModel>("Clients", ClientSchema.schema);
export = schema;
