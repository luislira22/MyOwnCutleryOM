import DataAccess from '../DataAccess'
import Mongoose from 'mongoose'

interface ClientProperties extends Mongoose.Document {
    email: string
    fullname: string
    password: string
    address: string
    //id
}

let mongoose = DataAccess.mongooseInstance
let mongooseConnection = DataAccess.mongooseConnection

class clientSchema {

    static get schema() {
        var schema = mongoose.schema({
            email: {
                type: String,
                required: true,
            },
            fullname: {
                type: String,
                required: true,
            },
            password: {
                type: String,
                required: true,
            },
            address: {
                type: String,
                required: true,
            }
        })
        return schema
    }
}

var schema = mongooseConnection.model<ClientProperties>("Clients", clientSchema.schema)
export = schema
