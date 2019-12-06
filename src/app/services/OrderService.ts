import OrderRepository = require("./../repository/OrderRepository");
import IOrderService = require("./interfaces/OrderService");
import OrderMapper = require("../mappers/orders/OrderMapper");
import OrderDTO from "../dtos/orders/OrderDTO";
import ClientService = require("./ClientService");
import Constants = require("../../config/constants/Constants");

const axios = require('axios');

class OrderService implements IOrderService {
    private _orderRepository: OrderRepository;

    private _clientService: ClientService;

    constructor() {
        this._orderRepository = new OrderRepository();
        this._clientService = new ClientService();
    }


    // POST HTTP method (CONNECTS TO MASTER DATA PRODUCT)
    create(item: OrderDTO, callback: (error: any, result: any) => void) {
        //TODO falta implementar a nova logica
        /*this._clientService.findById(item.client.id, (error, result) => {
            if (error) {
                throw new Error(error);
            } else {
                let order = OrderMapper.toDomain(item);
                axios.get(Constants.MPD_API_URL + order.productID).then(response => {
                    if (response.status == 200)
                        this._orderRepository.create(order, callback);
                    else throw new Error(error);
                })
                //TODO handle errors
            }
        });*/
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
