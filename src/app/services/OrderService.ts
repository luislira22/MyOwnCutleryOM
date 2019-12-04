import OrderRepository = require("./../repository/OrderRepository");
import IOrderService = require("./interfaces/OrderService");
import OrderMapper = require("../mappers/orders/OrderMapper");
import OrderDTO = require("../dtos/orders/OrderDTO");

class OrderService  implements IOrderService {
    private _orderRepository: OrderRepository;

    constructor () {
        this._orderRepository = new OrderRepository();
    }

    create (item: OrderDTO, callback: (error: any, result: any) => void) {
        let order = OrderMapper.toDomain(item);
        this._orderRepository.create(order, callback);
    }

    retrieve (callback: (error: any, result: any) => void) {
        //this._orderRepository.retrieve(callback);
        throw new Error('not implemented');
    }

    update (_id: string, item: OrderDTO, callback: (error: any, result: any) => void) {
        // this._orderRepository.findById(_id, (err, res) => {
        //     if(err) callback(err, res);
        //     else
        //         this._orderRepository.update(res._id, item, callback);
        //
        // });
        throw new Error('not implemented');
    }

    delete (_id: string, callback:(error: any, result: any) => void) {
        //this._orderRepository.delete(_id, callback);
        throw new Error('not implemented');
    }

    findById (_id: string, callback: (error: any, result: OrderDTO) => void) {
        //this._orderRepository.findById(_id, callback);
        throw new Error('not implemented');
    }

}
Object.seal(OrderService);
export = OrderService;
