import BaseMapper from "../BaseMapper";
import OrderDTO from "../../dtos/orders/OrderDTO";
import ClientMapper = require("../clients/ClientMapper");
import Order from "../../model/orders2/Order";
import Quantity from "../../model/orders2/Quantity";
import Status from "../../model/orders2/Status";
import OrderDate from "../../model/orders2/OrderDate";
import IOrderModel from "../../dataAccess/schemas/orders/interfaces/Order"

class OrderMapper implements BaseMapper<OrderDTO, Order> {

    public static fromDTOToDomain(orderDTO: OrderDTO): Order {
        return new Order(
            null, // <---- This is a problem TODO
            orderDTO.productID,
            new Quantity(orderDTO.quantity),
            new Status(orderDTO.status),
            new OrderDate(orderDTO.date)
        );
    }

    public static fromDomainToPersistence(order: Order): IOrderModel {
        let json = {
            client: order.client.id,
            quantity: {
                quantity: order.quantity.quantity
            },
            date: {
                date: order.date.date
            },
            status: {
                status: order.status.status
            },
            productID: order.productID
        };
        return <IOrderModel>json;
    }

    public static toDTOLight(order: Order): OrderDTO {
        let json = {
            id: order.id,
            client: order.client,
            quantity: order.quantity.quantity,
            date: order.date.date,
            status: order.status.status,
            productID: order.productID
        };
        // @ts-ignore Sugestao fazer um DTO ligth e um full
        return <OrderDTO>json;
    }

    public static toDTOFull(order: Order): OrderDTO {
        let json = {
            id: order.id,
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
