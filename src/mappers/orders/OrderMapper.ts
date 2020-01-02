import InputClientDTO from "../../dtos/users/clients/InputClientDTO";
import OutputClientDTO from "../../dtos/users/clients/OutputClientDTO";
import Order from "../../model/orders/Order";
import IOrderModel from "../../dataAccess/schemas/orders/interfaces/IOrderModel";
import IOrderFullModel from "../../dataAccess/schemas/orders/interfaces/IOrderFullModel";
import * as mongoose from "mongoose";
import Client from "../../model/user/client/Client";
import Email from "../../model/user/Email";
import Fullname from "../../model/user/client/Fullname";
import Address from "../../model/user/client/Address";
import Nif from "../../model/user/client/Nif";
import Priority from "../../model/user/client/Priority";
import OrderQuantity from "../../model/orders/OrderQuantity";
import OrderStatus from "../../model/orders/OrderStatus";
import OrderDate from "../../model/orders/OrderDate";
import OrderRequestedDeliveryDate from "../../model/orders/OrderRequestedDeliveryDate";
import InputOrderDTO from "../../dtos/orders/InputOrderDTO";
import OutputOrderDTO from "../../dtos/orders/OutputOrderDTO";
import ClientMapper from "../users/ClientMapper";
import OrderDeliveryDate from "../../model/orders/OrderDeliveryDate";
import OutputLightOrderDTO from "../../dtos/orders/OutputLightOrderDTO";

export default class OrderMapper {

    public static fromDTOToDomain(orderDTO: InputOrderDTO): Order {
        return (
            new Order(
                null,
                orderDTO.productID,
                new OrderQuantity(orderDTO.quantity),
                new OrderStatus(orderDTO.status),
                new OrderDate(new Date().toString()),
                new OrderRequestedDeliveryDate(orderDTO.deliveryDate)
            )
        );
    }

    public static fromDomainToDTO(order: Order): OutputOrderDTO {
        let orderDTO = {
            id: order.id,
            client: ClientMapper.fromDomainToDTO(order.client),
            quantity: order.quantity.quantity,
            date: order.date.date,
            requestDeliveryDate: order.requestDeliveryDate.date,
            deliveryDate: null,
            status: order.status.status,
            productID: order.productID
        };
        if (order.deliveryDate != undefined) orderDTO.deliveryDate = order.deliveryDate.date;
        return orderDTO;
    }

    public static fromDomainToLightDTO(order: Order): OutputLightOrderDTO {
        let orderDTO = {
            id: order.id,
            client: ClientMapper.fromDomainToNameDTO(order.client),
            quantity: order.quantity.quantity,
            date: order.date.date,
            requestDeliveryDate: order.requestDeliveryDate.date,
            deliveryDate: null,
            status: order.status.status,
            productID: order.productID
        };
        if (order.deliveryDate != undefined) orderDTO.deliveryDate = order.deliveryDate.date;
        return orderDTO;
    }

    public static fromDomainToPersistence(order: Order): mongoose.Model<IOrderModel> {
        let orderPersistence = {
            // @ts-ignore
            client: order.client.id,
            quantity: order.quantity.quantity,
            date: order.date.date,
            requestDeliveryDate: order.requestDeliveryDate.date,
            deliveryDate: null,
            status: order.status.status,
            productID: order.productID,
        };
        if (order.deliveryDate != undefined) orderPersistence.deliveryDate = order.deliveryDate.date;
        // @ts-ignore
        return orderPersistence;
    }

    public static fromPersistenceToDomain(orderModel: IOrderFullModel): Order {
        let order = new Order(
            new Client(
                new Email(orderModel.client.email),
                orderModel.client.password,
                new Fullname(orderModel.client.fullname.firstname, orderModel.client.fullname.lastname),
                new Address(orderModel.client.address.address, orderModel.client.address.postalcode, orderModel.client.address.city, orderModel.client.address.country),
                new Nif(orderModel.client.nif),
                new Priority(orderModel.client.priority),
                orderModel.client.role,
                orderModel.client.id),
            orderModel.productID,
            new OrderQuantity(orderModel.quantity),
            new OrderStatus(orderModel.status),
            new OrderDate(orderModel.date.toString()),
            new OrderRequestedDeliveryDate(orderModel.requestDeliveryDate.toString()),
            orderModel._id
        );
        if (orderModel.deliveryDate != undefined) order.deliveryDate = new OrderDeliveryDate(orderModel.deliveryDate.toString());
        return order;
    }
}
