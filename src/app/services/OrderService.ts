import OrderRepository = require("./../repository/OrderRepository");
import IOrderService = require("./interfaces/OrderService");
import OrderMapper = require("../mappers/orders/OrderMapper");
import OrderDTO from "../dtos/orders/OrderDTO";
import ClientService = require("./ClientService");

class OrderService implements IOrderService {
    private _orderRepository: OrderRepository;

    private _clientService: ClientService;

    constructor() {
        this._orderRepository = new OrderRepository();
        this._clientService = new ClientService();
    }

    private verifyProduct(productID: string): boolean {
        //TODO ligar ao mdp e ver se existe produto!!!!
        return true;
    }

    // POST HTTP method
    create(item: OrderDTO, callback: (error: any, result: any) => void) {
        this._clientService.findById(item.client.id, (error, result) => {
            if (error) {
                throw new Error(error);
            } else {
                let order = OrderMapper.toDomain(item);
                if (this.verifyProduct(order.productID))
                    this._orderRepository.create(order, callback);
                //TODO check error throwing
                //else throw new Error("Non existent Product");
            }
        });
    }

    // GET HTTP method
    retrieve(callback: (error: any, result: any) => void) {
        this._orderRepository.retrieve(callback);
    }

    update(_id: string, item: OrderDTO, callback: (error: any, result: any) => void) {
        this._orderRepository.findById(_id, (err, res) => {
            if (err) callback(err, res);
            else {
                if (item.quantity == undefined) {
                }
            }

            item.client = res.client.id;
            item.date = res.date[0].date;
            item.status = res.status[0].status;
            item.productID = res.productID;


            let order = OrderMapper.toDomain(item);
            this._orderRepository.update(res._id, order, callback);
        });
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
