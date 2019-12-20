import axios from 'axios'
import OrderRepository from "../../repository/OrderRepository";
import Order from "../../model/orders/Order";
import OrderQuantity from "../../model/orders/OrderQuantity";
import OrderStatus from "../../model/orders/OrderStatus";
import ClientService = require("../users/ClientService");

const OrderModel = require('../../dataAccess/schemas/orders/OrderSchema');

class OrderService {

    private _orderRepository: OrderRepository;

    constructor() {
        this._orderRepository = new OrderRepository(OrderModel);
    }

    public async create(order: Order, clientId: string): Promise<Order> {

        await axios.get(process.env.MPD_API_URL + order.productID).catch(reason => {
            return new Promise<Order>(((resolve, reject) => {
                reject("Product id does not exists")
            }))
        });

        let clientService = new ClientService();
        order.client = await clientService.findById(clientId);

        return await this._orderRepository.create(order);
    }

    public async findByClientId(id: string): Promise<Order[]> {
        return await this._orderRepository.findByClientId(id);
    }

    public async getAll(): Promise<Order[]> {
        return await this._orderRepository.find();
    }

    public async updateQuantity(orderId: string, clientId: string, orderQuantity: OrderQuantity) {
        let order = await this._orderRepository.findOne(orderId);
        if(order.client.id == clientId) {
            order.quantity = orderQuantity;
            return await this._orderRepository.update(orderId, order);
        } else {
            return new Promise<boolean>((resolve, reject) => {
                reject("Permission denied: client is not order owner.");
            });
        }
    }

    public async delete(orderId: string, clientId): Promise<boolean> {
        let order = await this._orderRepository.findOne(orderId);
        if (order.client.id == clientId) {
            order.status = new OrderStatus('CANCELLED');
            return await this._orderRepository.update(orderId, order);
        } else {
            return new Promise<boolean>((resolve, reject) => {
                reject("Permission denied: client is not order owner.");
            });
        }
    }

    public async findById(id: string) {
        return await this._orderRepository.findOne(id);
    }
}

Object.seal(OrderService);
export = OrderService
