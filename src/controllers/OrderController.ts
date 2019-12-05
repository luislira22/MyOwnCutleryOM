import express = require("express");
import OrderService = require("../app/services/OrderService");
import IBaseController = require("./interfaces/base/BaseController");
import OrderDTO from "../app/dtos/orders/OrderDTO";
import OrderMapper = require("../app/mappers/orders/OrderMapper");

class OrderController implements IBaseController <OrderService> {

    create(req: express.Request, res: express.Response): void {
        try {
            let orderDTO: OrderDTO = <OrderDTO>req.body;
            let orderService = new OrderService();
            orderService.create(orderDTO, (error, result) => {
                if (error) res.status(400).end(error.toString());
                else res.status(201).send(OrderMapper.toDTOLight(result));
            });
        } catch (e) {
            res.send({"error": e.message});
        }
    }

//TODO
    update(req: express.Request, res: express.Response): void {
        try {
            let order: OrderDTO = <OrderDTO>req.body;
            let _id: string = req.params._id;
            let orderService = new OrderService();
            orderService.update(_id, order, (error, result) => {
                if (error) res.status(400).send(error.toString());
                else res.status(200).send(result);
            });
        } catch (e) {
            console.log(e);
            res.send({"error": "error in your request"});
        }
    }

    delete(req: express.Request, res: express.Response): void {
        try {
            let _id: string = req.params._id;
            let orderService = new OrderService();
            orderService.delete(_id, (error, result) => {
                if (error) res.status(400).end(error.toString());
                else res.status(204).send({"204": "no content"});
            });
        } catch (e) {
            res.send({"error": e.message});

        }
    }

    retrieve(req: express.Request, res: express.Response): void {
        try {
            let orderService = new OrderService();
            orderService.retrieve((error, result) => {
                if (error) res.send({"error": "error"});
                else {
                    let fullResponse = [];
                    result.forEach(function (value) {
                        fullResponse.push(OrderMapper.toDTOFull(value))
                    });
                    res.status(200).send(fullResponse);
                }
            });
        } catch (e) {
            res.send({"error": "error in your request"});

        }
    }

    findById(req: express.Request, res: express.Response): void {
        try {

            let _id: string = req.params._id;

            let orderService = new OrderService();
            orderService.findById(_id, (error, result) => {
                if (error) res.send({"error": "error"});
                else res.send(OrderMapper.toDTOFull(result));
            });
        } catch (e) {
            console.log(e);
            res.send({"error": "error in your request"});
        }
    }
}

export = OrderController;
