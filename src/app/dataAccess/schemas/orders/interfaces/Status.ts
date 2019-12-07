import mongoose = require("mongoose");
import {ValidStatus} from "../../../../model/orders/enums/ValidStatus";

export default interface Status extends mongoose.Document {
    status: ValidStatus
}
