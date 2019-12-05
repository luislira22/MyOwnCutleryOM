import express = require("express");
import OrderController = require("../../controllers/OrderController");

var router = express.Router();
class OrderRoutes {
    private _orderController: OrderController;

    constructor () {
        this._orderController = new OrderController();
    }
    get routes () : express.Router {

        var controller = this._orderController;
        router.get("/orders", controller.retrieve);
        router.post("/orders", controller.create);
        router.put("/orders/:_id", controller.update);
        router.get("/orders/:_id", controller.findById);
        router.delete("/orders/:_id", controller.delete);

        return router;
    }


}

Object.seal(OrderRoutes);
export = OrderRoutes;
