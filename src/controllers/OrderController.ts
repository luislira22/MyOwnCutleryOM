import express = require("express");
import OrderService = require("../app/services/OrderService");
import IBaseController = require("./interfaces/base/BaseController");
import IOrder = require("../app/model/orders/interfaces/Order");
import OrderDTO from "../app/dtos/orders/OrderDTO";

class OrderController implements IBaseController <OrderService> {

    create(req: express.Request, res: express.Response): void {
        try {
            let orderDTO: OrderDTO = <OrderDTO>req.body;
            let orderService = new OrderService();
            orderService.create(orderDTO, (error, result) => {
                if (error) res.status(400).end(error.toString());
                else //res.send({"success": "success"});
                    res.status(201).send(res);
            });
        } catch (e) {
            console.log(e);
            res.send({"error": "error in your request"});
        }
    }

    create2(req: express.Request, res: express.Response): void {
        try {
            var order: IOrder = <IOrder>req.body;
            var orderService = new OrderService();
            orderService.create(order, (error, result) => {
                if (error) res.status(400).end(error.toString());
                else //res.send({"success": "success"});
                    res.status(201).send(res);
            });
        } catch (e) {
            console.log(e);
            res.send({"error": "error in your request"});
        }
    }

    update(req: express.Request, res: express.Response): void {
        try {
            var order: IOrder = <IOrder>req.body;
            var _id: string = req.params._id;
            var orderService = new OrderService();
            orderService.update(_id, order, (error, result) => {
                if (error) res.send({"error": "error"});
                else res.send({"success": "success"});
            });
        } catch (e) {
            console.log(e);
            res.send({"error": "error in your request"});

        }
    }

    delete(req: express.Request, res: express.Response): void {
        try {

            var _id: string = req.params._id;
            var orderService = new OrderService();
            orderService.delete(_id, (error, result) => {
                if (error) res.send({"error": "error"});
                else res.send({"success": "success"});
            });
        } catch (e) {
            console.log(e);
            res.send({"error": "error in your request"});

        }
    }

    retrieve(req: express.Request, res: express.Response): void {
        try {

            var orderService = new OrderService();
            orderService.retrieve((error, result) => {
                if (error) res.send({"error": "error"});
                else res.send(result);
            });
        } catch (e) {
            console.log(e);
            res.send({"error": "error in your request"});

        }
    }

    findById(req: express.Request, res: express.Response): void {
        try {

            var _id: string = req.params._id;

            var orderService = new OrderService();
            orderService.findById(_id, (error, result) => {
                if (error) res.send({"error": "error"});
                else res.send(result);
            });
        } catch (e) {
            console.log(e);
            res.send({"error": "error in your request"});

        }
    }
}

export = OrderController;
