import express = require("express");
import ClientController = require("../../controllers/ClientController");
import AuthMiddlewares from "../middlewares/AuthMiddlewares";
import OrderController = require("../../controllers/OrderController");


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
        router.get("/client", AuthMiddlewares.checkTokenByMethod(process.env.getClient), clientController.findById);
        //client updates name and address
        router.put("/client", AuthMiddlewares.checkTokenByMethod(process.env.updateNameAndAddress), clientController.updateNameAndAddres);
        //client creates order
        router.post("/client/order", AuthMiddlewares.checkTokenByMethod(process.env.createOrder), orderController.create);
        //client consult his orders
        router.get("/client/orders", AuthMiddlewares.checkTokenByMethod(process.env.consultOrders), orderController.getOrdersByClient);
        //client update order quantity
        router.put("/client/order/:orderId", AuthMiddlewares.checkTokenByMethod(process.env.updateOrder), orderController.updateQuantity);
        //client deletes all info related to him
        router.delete("/client", AuthMiddlewares.checkTokenByMethod(process.env.deleteClient), clientController.delete);
        //router.get("/clients",AuthMiddlewares.checkTokenByMethod(process.env.getAllClients), controller.retrieve);
        //router.delete("/clients",AuthMiddlewares.isAdmin,AuthMiddlewares.checkTokenByMethod(process.env.cancelOrder), controller.delete);
        return router;
    }
}

Object.seal(ClientRoutes);
export = ClientRoutes;
