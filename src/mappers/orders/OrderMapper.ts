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
import PPOrderDTO from "../../dtos/productionPlanning/PPOrderDTO";
import ProductionPlanningRequestDTO from "../../dtos/productionPlanning/ProductionPlanningRequestDTO";
import PPClientDTO from "../../dtos/productionPlanning/PPClientDTO";

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
            date: this.formatDate(order.date.date),
            requestDeliveryDate: this.formatDate(order.requestDeliveryDate.date),
            deliveryDate: null,
            status: order.status.status,
            productID: order.productID
        };
        if (order.deliveryDate != undefined) orderDTO.deliveryDate = this.formatDate(order.deliveryDate.date);
        return orderDTO;
    }

    public static fromDomainToLightDTO(order: Order): OutputLightOrderDTO {
        let orderDTO = {
            id: order.id,
            client: ClientMapper.fromDomainToNameDTO(order.client),
            quantity: order.quantity.quantity,
            date: this.formatDate(order.date.date),
            requestDeliveryDate: this.formatDate(order.requestDeliveryDate.date),
            deliveryDate: null,
            status: order.status.status,
            productID: order.productID
        };
        if (order.deliveryDate != undefined) orderDTO.deliveryDate = this.formatDate(order.deliveryDate.date);
        return orderDTO;
    }

    private static formatDate(date: Date): string {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear(),
            hour = '' + d.getHours(),
            minute = '' + d.getMinutes(),
            second = '' + d.getSeconds();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
        if (hour.length < 2)
            hour = '0' + hour;
        if (minute.length < 2)
            minute = '0' + minute;
        if (second.length < 2)
            second = '0' + second;

        return [day, month, year].join('-') + " " + [hour, minute, second].join(':');
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
    public static fromDomainListToProductionPlanningDTO(orders : Order[]) : ProductionPlanningRequestDTO{
        let PPDTO : ProductionPlanningRequestDTO = {orders:[],clients:[]};
        let clientMap : Map<string, string> = new Map<string, string>();
        let orderCounter = 1;
        let clientCounter = 1;
        orders.forEach(async (order) =>{

            //conclusion time in seconds
            let conclusionTime = order.date.date.getTime()/1000;
            //order id
            let orderId = order.id;
            //product id
            let productId = order.productID;
            //client id
            let clientId = order.client.id;
            let clientPriority = order.client.priority.value;
            let clientCId;
            //Build PP ClientDTO
            if(!clientMap.has(clientId)){
                //add client to the map
                clientCId = `c${clientCounter}`;
                clientMap.set(clientId,clientCId);
                clientCounter++;
                let clientDTO : PPClientDTO = {id:clientCId,priority:clientPriority};
                PPDTO.clients.push(clientDTO);
            }else{
                clientCId =  clientMap.get(clientId);
            }
            //Create PP OrderDTO
            let orderDTO : PPOrderDTO = {orderId:orderId,productId:productId,clientId:clientCId,quantity:order.quantity.quantity,conclusionTime: conclusionTime};
            orderCounter++;
            PPDTO.orders.push(orderDTO);
        });
        return PPDTO;
    }
}
