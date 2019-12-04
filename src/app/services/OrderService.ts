import OrderRepository = require("./../repository/OrderRepository");
import IOrderService = require("./interfaces/OrderService");
import IOrder = require("../model/orders/interfaces/Order");


class OrderService  implements IOrderService {
    private _orderRepository: OrderRepository;

    constructor () {
        this._orderRepository = new OrderRepository();
    }

    create (item: IOrder, callback: (error: any, result: any) => void) {
        this._orderRepository.create(item, callback);
    }

    retrieve (callback: (error: any, result: any) => void) {
        this._orderRepository.retrieve(callback);
    }

    update (_id: string, item: IOrder, callback: (error: any, result: any) => void) {
        this._orderRepository.findById(_id, (err, res) => {
            if(err) callback(err, res);
            else
                this._orderRepository.update(res._id, item, callback);

        });
    }

    delete (_id: string, callback:(error: any, result: any) => void) {
        this._orderRepository.delete(_id, callback);
    }

    findById (_id: string, callback: (error: any, result: IOrder) => void) {
        this._orderRepository.findById(_id, callback);
    }

}
Object.seal(OrderService);
export = OrderService;
