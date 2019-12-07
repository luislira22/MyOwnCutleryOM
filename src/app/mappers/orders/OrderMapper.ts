import BaseMapper from "../BaseMapper";
import OrderDTO from "../../dtos/orders/OrderDTO";
import ClientMapper = require("../clients/ClientMapper");
import Order from "../../model/orders2/Order";
import Quantity from "../../model/orders2/Quantity";
import Status from "../../model/orders2/Status";
import OrderDate from "../../model/orders2/OrderDate";
import IOrderModel from "../../dataAccess/schemas/orders/interfaces/Order"
import Client from "../../model/clients2/Client";

class OrderMapper implements BaseMapper<OrderDTO, Order> {

    public static fromDTOToDomain(orderDTO: OrderDTO, client: any): Order {
        return new Order(
            client,
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
        // @ts-ignore
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

    public static fromPersistenceToDomain(iOrder: IOrderModel) : Order {
        return new Order(
            ClientMapper.fromPersistenceToDomain(iOrder.client),
            iOrder.productID,
            new Quantity(iOrder.quantity.quantity),
            new Status(iOrder.status.status),
            new OrderDate(iOrder.date.date.toString()),
            iOrder.id
        )
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
        // @ts-ignore
        return <OrderDTO>json;
    }
}

export = OrderMapper
