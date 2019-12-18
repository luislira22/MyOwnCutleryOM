import OrderRepository from "../../repository/OrderRepository";
import Order from "../../model/orders/Order";
import OrderQuantity from "../../model/orders/OrderQuantity";
import OrderStatus from "../../model/orders/OrderStatus";

const OrderModel = require('../../dataAccess/schemas/orders');

class OrderService {

    private _orderRepository: OrderRepository;

    constructor() {
        this._orderRepository = new OrderRepository(OrderModel);
    }

    public async create(order: Order, clientId: string): Promise<Order> {
        //TODO
        //verificar produto
        /*await axios.get(Constants.MPD_API_URL + order.productID).then(response => {
            if (response.status != 200) callback("Product id does not exists", null);
            this._orderRepository.create(persistenceOrder, callback);
        }).catch(reason => {
            callback("Product id does not exists", null);
        });*/
        //Ir buscar client

        return await this._orderRepository.create(order);
    }

    public async getAllByClient(id: string): Promise<Order[]> {
        //TODO
        return null;
    }

    public async getAll(): Promise<Order[]> {
        return await this._orderRepository.find();
    }

    //FIX
    public async updateQuantity(id: string, orderQuantity: OrderQuantity) {
        //TODO ter a certeza que o user é o mesmo owner da order
        let order = await this._orderRepository.findOne(id);
        order.quantity = orderQuantity;
        return await this._orderRepository.update(id, order);
    }

    public async delete(orderId: string, clientId): Promise<boolean> {
        let order = await this._orderRepository.findOne(orderId);
        if (order.client.id == clientId) {
            order.status = new OrderStatus('CANCELLED');
            return await this._orderRepository.update(orderId, order);
        } else {
            return new Promise<boolean>((resolve) => {
                resolve(false);
            });
        }
    }

    public async findById(id: string) {
        return await this._orderRepository.findOne(id);
    }
}

Object.seal(OrderService);
export = OrderService
