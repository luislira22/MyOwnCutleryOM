import OrderRepository = require("./../repository/OrderRepository");
import IOrderService = require("./interfaces/OrderService");
import OrderMapper = require("../mappers/orders/OrderMapper");
import OrderDTO from "../dtos/orders/OrderDTO";
import ClientService = require("./ClientService");
import Constants = require("../../config/constants/Constants");
import {message} from "gulp-typescript/release/utils";
import Client from "../model/clients2/Client";
import ClientMapper = require("../mappers/clients/ClientMapper");

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
            this._clientService.findById(item.client, (error : any, client : Client) => {
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
            this._orderRepository.create(persistenceOrder, callback);
        }catch (e) {
            callback(e, null)
        }
    }

    // GET HTTP method
    retrieve(callback: (error: any, result: any) => void) {
        this._orderRepository.retrieve(callback);
    }

    update(_id: string, item: OrderDTO, callback: (error: any, result: any) => void) {
        //TODO falta implementar a nova logica
        /* this._orderRepository.findById(_id, (err, res) => {
             if (err) callback(err, res);
             else {
                 if (item.quantity == undefined) {
                 }
             }
             item.client = res.client.id;
             item.date = res.date.date;
             item.status = res.status.status;
             item.productID = res.productID;


             let order = OrderMapper.toDomain(item);
             this._orderRepository.update(res._id, order, callback);
         });*/
    }

    // DELETE HTTP method
    delete(_id: string, callback: (error: any, result: any) => void) {
        this._orderRepository.delete(_id, callback);
    }

    // GET/{id} HTTP method
    findById(_id: string, callback: (error: any, result: any) => void) {
        this._orderRepository.findById(_id, callback);
    }

}

Object.seal(OrderService);
export = OrderService;
