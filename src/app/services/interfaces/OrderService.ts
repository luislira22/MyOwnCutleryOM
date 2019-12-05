import BaseBusiness = require("./base/BaseService");
import IOrderDTO from "../../dtos/orders/OrderDTO";

interface OrderService extends BaseBusiness<IOrderDTO> {

}
export = OrderService;
