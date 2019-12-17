import express = require("express");
import ClientController = require("../../controllers/ClientController");
import AuthMiddlewares from "../middlewares/AuthMiddlewares";
let router = express.Router();

class AdminRoutes {
    private readonly _adminController: ClientController;

    constructor() {
        this._adminController = new ClientController();
    }

    get routes() {
        let controller = this._adminController;
        router.get("/admin/clients",AuthMiddlewares.checkTokenByMethod(process.env.getAllClients), controller.retrieve);
        router.put("/admin/clients/:id",AuthMiddlewares.checkTokenByMethod(process.env.updateNameAndAddress),controller.updateNameAndAddres);
        router.get("/admin/client/:id?", AuthMiddlewares.checkTokenByMethod(process.env.getClient), controller.findById);
        return router;
    }
}

Object.seal(AdminRoutes);
export = AdminRoutes;
