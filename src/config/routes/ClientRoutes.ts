import express = require("express");
import ClientController = require("../../controllers/ClientController");
import AuthMiddlewares from "../middlewares/AuthMiddlewares";

let router = express.Router();

class ClientRoutes {
    private readonly _clientController: ClientController;

    constructor() {
        this._clientController = new ClientController();
    }

    get routes() {
        let controller = this._clientController;
        router.get("/clients", controller.retrieve);
        router.post("/clients", controller.create);
        //router.post("/clients/login", controller.login); //TO REMOVE
        router.put("/clients", AuthMiddlewares.checkToken, controller.updateNameAndAddres);
        router.get("/client", AuthMiddlewares.checkToken, controller.findById);
        router.delete("/clients", AuthMiddlewares.checkToken, controller.delete);

        return router;
    }
}

Object.seal(ClientRoutes);
export = ClientRoutes;
