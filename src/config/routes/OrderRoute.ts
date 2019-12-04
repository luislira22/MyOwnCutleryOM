import express = require("express");
import OrderController = require("../../controllers/OrderController");
//TODO verificar
var router = express.Router();
class OrderRoutes {
    private _orderController: OrderController;

    constructor () {
        this._orderController = new OrderController();
    }
    get routes () : express.Router {

        var controller = this._orderController;
        router.get("/api/orders", controller.retrieve);
        router.post("/api/orders", controller.create);
        router.put("/api/orders/:_id", controller.update);
        router.get("/api/orders/:_id", controller.findById);
        router.delete("/api/orders/:_id", controller.delete);

        return router;
    }


}

Object.seal(OrderRoutes);
export = OrderRoutes;
