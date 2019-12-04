import BaseBusiness = require("./base/BaseService");
import IOrderModel = require("../../model/orders/interfaces/Order");

interface OrderService extends BaseBusiness<IOrderModel> {

}
export = OrderService;
