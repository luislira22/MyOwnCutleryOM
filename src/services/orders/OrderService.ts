import axios, {AxiosResponse} from 'axios'
import OrderRepository from "../../repository/OrderRepository";
import Order from "../../model/orders/Order";
import OrderQuantity from "../../model/orders/OrderQuantity";
import OrderStatus from "../../model/orders/OrderStatus";
import ClientService = require("../users/ClientService");
import OrderMapper from "../../mappers/orders/OrderMapper";
import ProductionPlanningRequestDTO from "../../dtos/productionPlanning/ProductionPlanningRequestDTO";
import ProductionPlanningResponseDTO from "../../dtos/productionPlanning/ProductionPlanningResponseDTO";
import PPOrderDTO from "../../dtos/productionPlanning/PPOrderDTO";
import OrderDeliveryDate from "../../model/orders/OrderDeliveryDate";

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
        let order;
        try {
            let order = await this._orderRepository.findOne(orderId);
        } catch (e) {
            return new Promise<boolean>((resolve, reject) => {
                reject("Order Id does not exists");
            });
        }
        if (order.client.id == clientId) {
            order.quantity = orderQuantity;
            return await this._orderRepository.update(orderId, order);
        } else {
            return new Promise<boolean>((resolve, reject) => {
                reject("Permission denied: client is not order owner.");
            });
        }
    }

    public async updateQuantityAdmin(orderId: string, orderQuantity: OrderQuantity) {
        let order;
        try {
            let order = await this._orderRepository.findOne(orderId);
        } catch (e) {
            return new Promise<boolean>((resolve, reject) => {
                reject("Order Id does not exists");
            });
        }
        order.quantity = orderQuantity;
        return await this._orderRepository.update(orderId, order);

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

    public getMostOrderedProductsByProductsQuantity() : Promise<string[]>{
        return this._orderRepository.getMostOrderedProductsByProductsQuantity();
    }
    public getMostOrderedProductsByOrdersQuantity() : Promise<string[]>{
        return this._orderRepository.getMostOrderedProductsByOrdersQuantity();
    }

    public async createProductionPlanning(){
        //get accepted Orders
        let detailedOrders : Order[] = await this._orderRepository.findAccepted();
        //production planning DTO
        let ppDTO : ProductionPlanningRequestDTO = OrderMapper.fromDomainListToProductionPlanningDTO(detailedOrders);
        //make request to production planning server
        let data = await axios({
            method: 'post',
            url: process.env.PP_API_URL+"/productionplanning",
            data: ppDTO
        }).then((result)=>{
            return result.data;
        }).catch((error)=>{
            console.log(error);
        });

        //update request
        let ppRDTO : ProductionPlanningResponseDTO = <ProductionPlanningResponseDTO>data;
        console.log(ppRDTO);
        for(let orderJson of ppRDTO.orderList){
            let orderId = orderJson.orderId;
            //received delivery date
            // @ts-ignore
            let endTime = orderJson.endTime * 1000;
            let deliveryDate = new Date(endTime);
            //create delivery date object
            let orderDeliveryDate : OrderDeliveryDate = new OrderDeliveryDate(deliveryDate.toDateString());
            //fetch order
            let order = await this._orderRepository.findOne(orderId);
            order.deliveryDate = orderDeliveryDate;
            //change end date
            await this._orderRepository.update(orderId,order);
        }
        //console.log(res);
    }
}

Object.seal(OrderService);
export = OrderService
