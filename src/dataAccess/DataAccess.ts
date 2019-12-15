import Mongoose = require("mongoose");
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;

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

        this.mongooseInstance = Mongoose.connect(DB_CONNECTION_STRING);
        return this.mongooseInstance;
    }
}

DataAccess.connect();
export = DataAccess;
