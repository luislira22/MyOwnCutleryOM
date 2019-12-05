import OrderRepository = require("./../repository/OrderRepository");
import IOrderService = require("./interfaces/OrderService");
import OrderMapper = require("../mappers/orders/OrderMapper");
import OrderDTO = require("../dtos/orders/OrderDTO");
import ClientRepository = require("../repository/ClientRepository");
import ClientService = require("./ClientService");
import Order = require("../model/orders/interfaces/Order");
import * as mongoose from "mongoose";

const {parse, stringify} = require('flatted/cjs');

class OrderService implements IOrderService {
    private _orderRepository: OrderRepository;

    private _clientService: ClientService;

    constructor() {
        this._orderRepository = new OrderRepository();
        this._clientService = new ClientService();
    }

    create(item: OrderDTO, callback: (error: any, result: any) => void) {
        this._clientService.findById(item.client.id, (error, result) => {
            if (error) {
                throw new Error(error);
            } else {
                let order = OrderMapper.toDomain(item);
                this._orderRepository.create(order, callback);
            }
        });


    }

    retrieve(callback: (error: any, result: any) => void) {
        this._orderRepository.retrieve(callback);
    }

    update(_id: string, item: OrderDTO, callback: (error: any, result: any) => void) {
        // this._orderRepository.findById(_id, (err, res) => {
        //     if(err) callback(err, res);
        //     else
        //         this._orderRepository.update(res._id, item, callback);
        //
        // });
        throw new Error('not implemented');
    }

    delete(_id: string, callback: (error: any, result: any) => void) {
        //this._orderRepository.delete(_id, callback);
        throw new Error('not implemented');
    }

    findById(_id: string, callback: (error: any, result: OrderDTO) => void) {
        //this._orderRepository.findById(_id, callback);
        throw new Error('not implemented');
    }

}

Object.seal(OrderService);
export = OrderService;
