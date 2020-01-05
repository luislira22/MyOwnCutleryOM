import express = require("express");
import OrderService = require("../services/orders/OrderService");
import InputOrderDTO from "../dtos/orders/InputOrderDTO";
import OrderMapper from "../mappers/orders/OrderMapper";
import OrderQuantity from "../model/orders/OrderQuantity";
import Order from "../model/orders/Order";

class OrderController {

    public async create(req: express.Request, res: express.Response): Promise<void> {
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

    public async getOrdersByClient(req: express.Request, res: express.Response) {
        try {
            // @ts-ignore
            let clientId = req.decoded.id;
            let orderService = new OrderService();
            await orderService.findByClientId(clientId).then(value => {
                let ordersDTO = [];
                value.forEach(function (element: Order) {
                    ordersDTO.push(OrderMapper.fromDomainToDTO(element));
                });
                res.status(200).send(ordersDTO);
            }).catch(value => {
                res.status(400).send(value);
            })
        } catch (e) {
            res.status(500).send(e.message);
        }
    }

    public async deleteOrderByClient(req: express.Request, res: express.Response) {
        /* try {
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
        }*/
    }

    public async updateQuantity(req: express.Request, res: express.Response): Promise<void> {
        try {
            let order: InputOrderDTO = <InputOrderDTO>req.body;
            // @ts-ignore
            let clientId = req.decoded.id;
            let orderId = req.params.orderId;
            let quantity = new OrderQuantity(order.quantity);
            let orderService = new OrderService();
            await orderService.updateQuantity(orderId, clientId, quantity).then(value => {
                res.status(200).send(value);
            }).catch(value => {
                res.status(400).send(value);
            });
        } catch (e) {
            res.status(500).send(e.message);
        }
    }

    public async updateQuantityAdmin(req: express.Request, res: express.Response): Promise<void> {
        try {
            let order: InputOrderDTO = <InputOrderDTO>req.body;
            // @ts-ignore
            let orderId = req.params.orderId;
            let quantity = new OrderQuantity(order.quantity);
            let orderService = new OrderService();
            await orderService.updateQuantityAdmin(orderId, quantity).then(value => {
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
            let orderId = req.params.orderId;
            let orderService = new OrderService();
            await orderService.delete(orderId).then(value => {
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
                    orders.push(OrderMapper.fromDomainToLightDTO(element));
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

    public async getMostOrderedProductsByProductsQuantity(req: express.Request, res: express.Response): Promise<void> {
        try {
            let orderService = new OrderService();
            await orderService.getMostOrderedProductsByProductsQuantity().then(value => {
                res.status(200).send(value);
            }).catch(value => {
                res.status(400).send(value);
            });
        } catch (e) {
            res.status(500).send(e.message);
        }
    }

    public async getMostOrderedProductsByOrdersQuantity(req: express.Request, res: express.Response): Promise<void> {
        try {
            let orderService = new OrderService();
            await orderService.getMostOrderedProductsByOrdersQuantity().then(value => {
                res.status(200).send(value);
            }).catch(value => {
                res.status(400).send(value);
            });
        } catch (e) {
            res.status(500).send(e.message);
        }
    }
}

export = OrderController;
