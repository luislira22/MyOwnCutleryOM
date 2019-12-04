import IOrderModel = require("../model/orders/interfaces/Order");
import OrderSchema = require("./../dataAccess/schemas/OrderSchema");
import RepositoryBase = require("./base/RepositoryBase");

class OrderRepository  extends RepositoryBase<IOrderModel> {
    constructor () {
        super(OrderSchema);
    }

}

Object.seal(OrderRepository);
export = OrderRepository;

