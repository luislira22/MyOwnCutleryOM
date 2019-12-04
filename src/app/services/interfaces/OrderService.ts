import BaseBusiness = require("./base/BaseService");
import IOrderDTO = require("../../dtos/orders/OrderDTO");

interface OrderService extends BaseBusiness<IOrderDTO> {

}
export = OrderService;
