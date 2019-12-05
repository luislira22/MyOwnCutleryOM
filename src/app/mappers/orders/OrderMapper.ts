import {BaseMapper} from "../BaseMapper";
import IOrder = require("../../model/orders/interfaces/Order");
import OrderDTO = require("../../dtos/orders/OrderDTO");

"../../dtos/orders/OrderDTO";
import * as mongoose from "mongoose";
import ClientDTO from "../../dtos/clients/ClientDTO";
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
            }
        };
        // @ts-ignore
        return <IOrder>json;
    }

    public static toDTOLight(order: IOrder): OrderDTO {
        let json = {
            id: order._id,
            client: order.client,
            quantity: order.quantity[0].quantity,
            date: order.date[0].date,
            status: order.status[0].status
        };
        // @ts-ignore
        return <OrderDTO>json;
    }

    public static toDTOFull(order: IOrder): OrderDTO {
        let json = {
            id: order._id,
            client: ClientMapper.toDTO(order.client),
            quantity: order.quantity[0].quantity,
            date: order.date[0].date,
            status: order.status[0].status
        };
        return <OrderDTO>json;
    }
}

export = OrderMapper
