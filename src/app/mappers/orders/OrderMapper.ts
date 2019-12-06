import {BaseMapper} from "../BaseMapper";
import IOrder = require("../../model/orders/interfaces/Order");
import OrderDTO from "../../dtos/orders/OrderDTO";
import ClientMapper = require("../clients/ClientMapper");

class OrderMapper implements BaseMapper<IOrder, OrderDTO> {

    public static toDomain(orderDTO: OrderDTO): IOrder {
        let json = {
            client: orderDTO.client,
            quantity: {
                quantity: orderDTO.quantity
            },
            date: {
                date: orderDTO.date,
            },
            status: {
                status: orderDTO.status
            },
            productID: orderDTO.productID
        };
        // @ts-ignore
        return <IOrder>json;
    }

    public static toDTOLight(order: IOrder): OrderDTO {
        let json = {
            id: order._id,
            client: order.client,
            quantity: order.quantity.quantity,
            date: order.date.date,
            status: order.status.status,
            productID: order.productID
        };
        // @ts-ignore
        return <OrderDTO>json;
    }

    public static toDTOFull(order: IOrder): OrderDTO {
        let json = {
            id: order._id,
            client: ClientMapper.toDTO(order.client),
            quantity: order.quantity.quantity,
            date: order.date.date,
            status: order.status.status,
            productID: order.productID
        };
        return <OrderDTO>json;
    }
}

export = OrderMapper
