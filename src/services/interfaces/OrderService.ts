import BaseBusiness = require("./base/BaseService");
import IOrderDTO from "../../dtos/orders/InputOrderDTO";

interface OrderService extends BaseBusiness<IOrderDTO> {

}
export = OrderService;
