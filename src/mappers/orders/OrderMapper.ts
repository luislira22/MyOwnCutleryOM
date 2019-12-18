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

export default class OrderMapper {

    public static fromDTOToDomain(orderDTO: InputOrderDTO): Order {
        return (
            new Order(
                null,
                orderDTO.productID,
                new OrderQuantity(orderDTO.quantity),
                new OrderStatus(orderDTO.status),
                new OrderDate(orderDTO.date),
                new OrderRequestedDeliveryDate(orderDTO.deliveryDate)
            )
        );
    }

    public static fromDomainToDTO(order: Order): OutputOrderDTO {
        return ({
            client: ClientMapper.fromDomainToDTO(order.client),
            quantity: order.quantity.quantity,
            date: order.date.date.toString(),
            deliveryDate: order.date.date.toString(),
            status: order.status.status,
            productID: order.productID
        });
    }

    public static fromDomainToPersistence(order: Order): mongoose.Model<IOrderModel> {
        return ({
            // @ts-ignore
            client: order.client.id,
            quantity: order.quantity.quantity,
            date: order.date.date,
            requestDeliveryDate: order.requestDeliveryDate.date,
            deliveryDate: order.deliveryDate.date,
            status: order.status.status,
            productID: order.productID,
        });
    }

    public static fromPersistenceToDomain(orderModel: IOrderFullModel): Order {
        return new Order(
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
            new OrderRequestedDeliveryDate(orderModel.requestDeliveryDate.toString())
        );
    }
}
