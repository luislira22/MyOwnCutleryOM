import express = require("express");
import UserController = require("../../controllers/UserController");
import OrderController = require("../../controllers/OrderController");

let router = express.Router();

class UserRoutes {
    private readonly _userController: UserController;
    private readonly _orderController: OrderController;

    constructor() {
        this._userController = new UserController();
        this._orderController = new OrderController();
    }

    get routes() {
        let userController = this._userController;
        let orderController = this._orderController;
        //auth user
        router.post("/login", userController.login);
        //Consult most ordered products (most quantity of items)
        router.get("/orders/productsQuantity",orderController.getMostOrderedProductsByProductsQuantity);
        //Consult most ordered products (most quantity of orders)
        router.get("/orders/ordersQuantity",orderController.getMostOrderedProductsByOrdersQuantity);

        return router;
    }
}

Object.seal(UserRoutes);
export = UserRoutes;
