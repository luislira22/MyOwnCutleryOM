import * as mongoose from "mongoose";

const UserModel = require("./UserSchema");

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

const ClientModel = UserModel.discriminator('client', new mongoose.Schema({
        fullname: {
            type: FullnameSchema,
            required: true,
        },
        address: {
            type: AddressSchema,
            required: true,
        },
        nif: {
            type: Number,
            required: true,
        },
        priority: {
            type: Number,
            required: true,
        }
    })
);

module.exports = mongoose.model('client');
