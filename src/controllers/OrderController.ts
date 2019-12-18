import express = require("express");
import OrderService = require("../services/orders/OrderService");
import InputOrderDTO from "../dtos/orders/InputOrderDTO";
import OrderMapper from "../mappers/orders/OrderMapper";
import OrderQuantity from "../model/orders/OrderQuantity";

class OrderController {

    async create(req: express.Request, res: express.Response): Promise<void> {
        try {
            let orderDTO: InputOrderDTO = <InputOrderDTO>req.body;
            // @ts-ignore
            let clientId = req.decoded.id;
            let orderService = new OrderService();
            await orderService.create(OrderMapper.fromDTOToDomain(orderDTO), clientId).then(value => {
                res.status(201).send(OrderMapper.fromDomainToDTO(value));
            }).catch(value => {
                res.status(400).send(value);
            })
        } catch (e) {
            res.status(500).send(e.message);
        }
    }

    async getOrdersByClient(req: express.Request, res: express.Response) {
        /*try{
            //@ts-ignore
            let id : string = req.decoded.id;
            let orderService : OrderService = new OrderService();
            let ordersDomain : Order[] = await orderService.getOrdersByClient(id).then((result)=>{
                return result;
            }).catch((error)=>{
                throw new Error(error);
            });
            let ordersDTO : InputOrderDTO[] = [];
            await ordersDomain.forEach(child => {
                ordersDTO.push(OrderMapper.toDTOLight(child))
            });
            return res.status(200).send(ordersDTO);
        }catch(error){
            res.status(500).send(error.message);
        }*/
    }

    public async deleteOrderByClient(req: express.Request, res: express.Response) {
        /*try{
            //@ts-ignore
            let clientId : string = req.decoded.id;
            let orderId :string = req.params.id;
            let orderService : OrderService = new OrderService();
            await orderService.deleteOrderByClient(clientId,orderId).catch((error) =>{
                throw new Error(error);
            });
            res.status(204).send();
        }
        catch(error){
            res.status(500).send(error.message);
        }*/
    }

    public async updateQuantity(req: express.Request, res: express.Response): Promise<void> {
        try {
            let order: InputOrderDTO = <InputOrderDTO>req.body;
            let orderId = req.params._id;
            let quantity = new OrderQuantity(order.quantity);
            let orderService = new OrderService();
            await orderService.updateQuantity(orderId, quantity).then(value => {
                res.status(200).send(value);
            }).catch(value => {
                res.status(400).send(value);
            });
        } catch (e) {
            res.status(500).send(e.message);
        }
    }

    public async delete(req: express.Request, res: express.Response): Promise<void> {
        try {
            //@ts-ignore
            let clientId = req.decoded.id;
            let orderId = req.params._id;
            let orderService = new OrderService();
            await orderService.delete(orderId, clientId).then(value => {
                res.status(204).send(value);
            }).catch(value => {
                res.status(400).send(value);
            });
        } catch (e) {
            res.status(500).send(e.message);
        }
    }

    public async retrieve(req: express.Request, res: express.Response): Promise<void> {
        try {
            let orderService = new OrderService();
            await orderService.getAll().then(value => {
                let orders = [];
                value.forEach(function (element) {
                    orders.push(OrderMapper.fromDomainToDTO(element));
                });
                res.status(200).send(orders);
            }).catch(value => {
                res.status(400).send(value);
            });
        } catch (e) {
            res.status(500).send(e.message);
        }
    }

    async findById(req: express.Request, res: express.Response): Promise<void> {
        try {
            let orderId = req.params._id;
            let orderService = new OrderService();
            await orderService.findById(orderId).then(value => {
                res.status(200).send(OrderMapper.fromDomainToDTO(value));
            }).catch(value => {
                res.status(400).send(value);
            });
        } catch (e) {
            res.status(500).send(e.message);
        }
    }
}

export = OrderController;
