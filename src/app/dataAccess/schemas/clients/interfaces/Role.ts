import mongoose = require("mongoose");

export default interface Role extends mongoose.Document {
    role: string
}
