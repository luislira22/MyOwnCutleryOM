import mongoose = require("mongoose");
import {ValidStatus} from "../enums/ValidStatus";

interface Status extends mongoose.Document {
    status: ValidStatus
}

export = Status;
