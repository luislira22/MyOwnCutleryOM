import {BaseMapper} from "../BaseMapper";
import IOrder = require("../../model/orders/interfaces/Order");
import OrderDTO  from "../../dtos/orders/OrderDTO";

class OrderMapper extends BaseMapper<IOrder> {


    public static toDomain(orderDTO: OrderDTO): IOrder {
        let json = {
            client: null,
            quantity: {
                quantity: orderDTO.quantity
            },
            date: {
                date: orderDTO.date,
            },
            status: {
                status: null
            }
        };
        return <IOrder>json;
    }
}

export = OrderMapper
