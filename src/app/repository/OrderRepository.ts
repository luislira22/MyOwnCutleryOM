import IOrderModel = require("../model/orders/interfaces/Order");
import OrderSchema = require("./../dataAccess/schemas/OrderSchema");
import RepositoryBase = require("./base/RepositoryBase");
import * as mongoose from "mongoose";

class OrderRepository extends RepositoryBase<IOrderModel> {

    constructor() {
        super(OrderSchema);
    }

    retrieve(callback: (error: any, result: mongoose.Document[]) => void) {
        this._model.find({}, callback).populate('client');
    }

    findById(_id: string, callback: (error: any, result: IOrderModel) => void) {
        this._model.findById(_id, callback).populate('client');
    }
}

Object.seal(OrderRepository);
export = OrderRepository;

