import {BaseMapper} from "../BaseMapper";
import Order = require("../../model/orders/Order");
import OrderDTO = require("../../dtos/orders/OrderDTO");

class OrderMapper extends BaseMapper<Order> {



    public static toDomain(orderDTO: OrderDTO): Order{

        new Order(
            {
                client:orderDTO.client,
                quantity:orderDTO.quantity,
                date:orderDTO.date,
                status:orderDTO.status
            }
        )
        return null;
    }


}
