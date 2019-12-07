import express = require("express");
import ClientController = require("../../controllers/ClientController");
import AuthMiddlewares from "../middlewares/AuthMiddlewares";

var router = express.Router();

class ClientRoutes {
    private _clientController: ClientController;

    constructor() {
        this._clientController = new ClientController();
    }

    get routes() {
        var controller = this._clientController;
        router.get("/clients", controller.retrieve);
        router.post("/clients", controller.create);
        //router.put("/clients/:_id", controller.update);
        router.post("/clients/login",controller.login);
        router.put("/clients/:_id",AuthMiddlewares.checkToken ,controller.updateNameAndAddres);
        router.get("/client",AuthMiddlewares.checkToken,controller.findById);
        router.delete("/clients/:_id", controller.delete);

        return router;
    }
}

Object.seal(ClientRoutes);
export = ClientRoutes;
