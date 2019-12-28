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
        if (order.client.id == clientId) {
            order.quantity = orderQuantity;
            return await this._orderRepository.update(orderId, order);
        } else {
            return new Promise<boolean>((resolve, reject) => {
                reject("Permission denied: client is not order owner.");
            });
        }
    }

    public async delete(orderId: string): Promise<boolean> {
        let order = await this._orderRepository.findOne(orderId);
        order.status = new OrderStatus('CANCELLED');
        return await this._orderRepository.update(orderId, order);
    }


    public async deleteByClient(orderId: string, clientId): Promise<boolean> {
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

    public async getTrendingProducts(): Promise<string[]> {
        let orders = await this.getAll();
        let products: string[];
        let ordered: string[];

        orders.forEach(order =>
            products.push(order.productID)
        );

        while (products.length > 0) {
            let tempMax = OrderService.mode(products);
            ordered.push(tempMax);
           products = this.without(products, tempMax);
        }
        return ordered;
        // Lista ordenada com os produtos trending por exemplo [Produto1, Produto2, Produto3]
        //TODO se calhar retornar uma lista de pares (Produto, Presente em X nº de encomendas) ,
        // para saber qual e o mais trending apesar de ja estar organizado por essa ordem.
    }

    private without(array, what): string[] {
        return array.filter(function (element) {
            return element !== what;
        });
    }

    private static mode(array): string {
        if (array.length == 0)
            return null;
        let modeMap = {};
        let maxEl = array[0], maxCount = 1;
        for (let i = 0; i < array.length; i++) {
            const el = array[i];
            if (modeMap[el] == null)
                modeMap[el] = 1;
            else
                modeMap[el]++;
            if (modeMap[el] > maxCount) {
                maxEl = el;
                maxCount = modeMap[el];
            }
        }
        return maxEl;
    }


}

Object.seal(OrderService);
export = OrderService
