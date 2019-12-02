
import Mongoose = require("mongoose");
import config from '../config';

class DataAccess {
    static mongooseInstance: any;
    static mongooseConnection: Mongoose.Connection;

    constructor() {
        DataAccess.connect();
    }

    static connect(): Mongoose.Connection {
        if (this.mongooseInstance) return this.mongooseInstance;

        this.mongooseConnection = Mongoose.connection;
        this.mongooseConnection.once("open", () => {
            console.log("Conectado ao mongodb.");
        });
        this.mongooseInstance = Mongoose.connect(config.databaseURL, { useNewUrlParser: true, useCreateIndex: true });
        return this.mongooseInstance;
    }
}

DataAccess.connect();
export = DataAccess;