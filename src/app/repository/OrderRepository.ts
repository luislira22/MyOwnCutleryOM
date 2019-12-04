import SpartanModel = require("../model/Spartan");
import IOrderModel = require("../model/orders/interfaces/Order");
import OrdernSchema = require("./../dataAccess/schemas/OrderSchema");
import RepositoryBase = require("./base/RepositoryBase");

class OrderRepository  extends RepositoryBase<IOrderModel> {
    constructor () {
        super(OrderSchema);
    }

}

Object.seal(OrderRepository);
export = OrderRepository;
//TODO fazer
