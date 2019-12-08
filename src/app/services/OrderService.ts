import OrderRepository = require("./../repository/OrderRepository");
import IOrderService = require("./interfaces/OrderService");
import OrderMapper = require("../mappers/orders/OrderMapper");
import OrderDTO from "../dtos/orders/OrderDTO";
import ClientService = require("./ClientService");
import Constants = require("../../config/constants/Constants");
import Client from "../model/clients2/Client";
import Order from "../model/orders2/Order";
import Quantity from "../model/orders2/Quantity";
import OrderSchema from "../dataAccess/schemas/orders/interfaces/Order";

const axios = require('axios');

class OrderService implements IOrderService {
    private _orderRepository: OrderRepository;

    private _clientService: ClientService;

    constructor() {
        this._orderRepository = new OrderRepository();
        this._clientService = new ClientService();
    }


    // POST HTTP method (CONNECTS TO MASTER DATA PRODUCT)
    async create(item: OrderDTO, callback: (error: any, result: any) => void) {
        let getClient = new Promise((resolve, reject) => {
            this._clientService.findById(item.client, (error: any, client: Client) => {
                if (error || client == null) reject("Client does not exists");
                resolve(client);
            });
        });
        let client = await getClient.then((client) => {
            return client;
        }).catch((message) => {
            callback(message, null);
        });
        try {
            let order = OrderMapper.fromDTOToDomain(item, client);
            let persistenceOrder = OrderMapper.fromDomainToPersistence(order);
            axios.get(Constants.MPD_API_URL + order.productID).then(response => {
                if (response.status != 200) callback("Product id does not exists", null);
                this._orderRepository.create(persistenceOrder, callback);
            }).catch(reason => {
                callback("Product id does not exists", null);
            });
        } catch (e) {
            callback(e, null)
        }
    }

    async getOrdersByClient(id : string) : Promise<Order[]>{
        let fetchDataOrders = new Promise((resolve,reject) =>{
            this._orderRepository.findByClientId(id,(error,result) =>{
                if(error)
                    reject(error);
                resolve(result);
            });
        });
        let ordersPersistence : OrderSchema[] = await fetchDataOrders.then((orders : OrderSchema[]) => {
            return orders;
        }).catch((error)=>{
            throw new Error(error);
        });
        let orders : Order[] = [];
        await ordersPersistence.forEach((child) => {
            let orderDomain : Order =  OrderMapper.fromPersistenceToDomain(child);
            orders.push(orderDomain);
        });
        return orders;
    }

    // GET HTTP method
    retrieve(callback: (error: any, result: any) => void) {
        this._orderRepository.retrieve(callback);
    }

    async update(_id: string, item: OrderDTO, callback: (error: any, result: any) => void) {
        let getOrder = new Promise((resolve, reject) => {
            this.findById(_id, (error: any, order: Order) => {
                if (error || order == null) reject("Order does not exists");
                resolve(order);
            });
        });
        let order: Order = <Order>await getOrder.then((order: Order) => {
            return order;
        }).catch((message) => {
            callback(message, null);
        });
        if (item.quantity == undefined) callback("Quantity must be defined", null);
        try {
            order.quantity = new Quantity(item.quantity);
            let orderPersistence = OrderMapper.fromDomainToPersistence(order);
            // @ts-ignore
            this._orderRepository.update(_id, orderPersistence, callback);
        } catch (e) {
            callback(e.message, null);
        }
    }

    // DELETE HTTP method
    delete(_id: string, callback: (error: any, result: any) => void) {
        this._orderRepository.delete(_id, callback);
    }

    // GET/{id} HTTP method
    findById(_id: string, callback: (error: any, result: any) => void) {
        this._orderRepository.findById(_id, (error2, result2) => {
            if (error2) callback(error2, null);
            else callback(null, OrderMapper.fromPersistenceToDomain(result2));
        });
    }

}

Object.seal(OrderService);
export = OrderService;
