import express = require("express");
import OrderController = require("../../controllers/OrderController");
import AuthMiddlewares from "../middlewares/AuthMiddlewares";
import Auth from "../middlewares/AuthMiddlewares";

var router = express.Router();

class OrderRoutes {
    private _orderController: OrderController;

    constructor() {
        this._orderController = new OrderController();
    }

    get routes(): express.Router {

        var controller = this._orderController;
        router.get("/orders/client", AuthMiddlewares.checkToken, controller.getOrdersByClient);
        router.delete("/orders/:_id",AuthMiddlewares.checkToken,controller.deleteOrderByClient);
        router.get("/orders", controller.retrieve);
        router.post("/orders",AuthMiddlewares.checkToken, controller.create);
        router.put("/orders/:_id", controller.update);
        router.get("/orders", AuthMiddlewares.checkToken, controller.findById);


        return router;
    }


}

Object.seal(OrderRoutes);
export = OrderRoutes;
