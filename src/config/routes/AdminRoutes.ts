import express = require("express");
import AuthMiddlewares from "../middlewares/AuthMiddlewares";
import AdminController = require("../../controllers/AdminController");
import ClientController = require("../../controllers/ClientController");
import OrderController = require("../../controllers/OrderController");

let router = express.Router();

class AdminRoutes {
    private readonly _adminController: AdminController;
    private readonly _orderController: OrderController;

    constructor() {
        this._adminController = new AdminController();
        this._orderController = new OrderController();

    }

    get routes() {
        let adminController = this._adminController;
        let orderController = this._orderController;
        //Create admin
        router.post("/admin", adminController.create);
        //Admin consults all clients (name)
        router.get("/admin/clients", AuthMiddlewares.checkAdminToken, adminController.retrieveNames);
        //Admin updates client name and address TODO se o clientId nao existir crasha 🤯
        router.put("/admin/client/:clientId", AuthMiddlewares.checkAdminToken, adminController.updateNameAndAddress);
        //Admin consult all orders
        router.get("/admin/orders", AuthMiddlewares.checkAdminToken, orderController.retrieve);
        //Admin cancel order
        router.delete("/admin/order/:orderId", AuthMiddlewares.checkAdminToken, orderController.delete);
        //Admin delete order
        router.delete("/admin/client/:clientId", AuthMiddlewares.checkAdminToken, adminController.deleteClient);

        return router;
    }
}

Object.seal(AdminRoutes);
export = AdminRoutes;
