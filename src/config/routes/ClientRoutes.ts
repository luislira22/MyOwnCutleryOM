import express = require("express");
import ClientController = require("../../controllers/ClientController");
import AuthMiddlewares from "../middlewares/AuthMiddlewares";
import OrderController = require("../../controllers/OrderController");
const configs = require('../config');

let router = express.Router();

class ClientRoutes {
    private readonly _clientController: ClientController;
    private readonly _orderController: OrderController;

    constructor() {
        this._clientController = new ClientController();
        this._orderController = new OrderController();
    }

    get routes() {
        let clientController = this._clientController;
        let orderController = this._orderController;
        //create client
        router.post("/client", clientController.create);
        //consult client
        router.get("/client", AuthMiddlewares.checkTokenByMethod(configs.permissions.getClient), clientController.findById);
        //client updates name and address
        router.put("/client", AuthMiddlewares.checkTokenByMethod(configs.permissions.updateNameAndAddress), clientController.updateNameAndAddres);
        //client creates order
        router.post("/client/order", AuthMiddlewares.checkTokenByMethod(configs.permissions.createOrder), orderController.create);
        //client consult his orders
        router.get("/client/orders", AuthMiddlewares.checkTokenByMethod(configs.permissions.consultOrders), orderController.getOrdersByClient);
        //client update order quantity
        router.put("/client/order/:orderId", AuthMiddlewares.checkTokenByMethod(configs.permissions.updateOrder), orderController.updateQuantity);
        //client deletes all info related to him
        router.delete("/client", AuthMiddlewares.checkTokenByMethod(configs.permissions.deleteClient), clientController.delete);
        return router;
    }
}

Object.seal(ClientRoutes);
export = ClientRoutes;
