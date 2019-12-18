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
        router.get("/clients",AuthMiddlewares.checkTokenByMethod(process.env.getAllClients), controller.retrieve);
        router.post("/clients",AuthMiddlewares.checkTokenByMethod(process.env.createClient), controller.create);
        router.put("/clients/:id?", AuthMiddlewares.checkTokenByMethod(process.env.updateNameAndAddress), controller.updateNameAndAddres);
        router.get("/client/:id?", AuthMiddlewares.checkTokenByMethod(process.env.getClient), controller.findById);
        //router.delete("/clients",AuthMiddlewares.isAdmin,AuthMiddlewares.checkTokenByMethod(process.env.cancelOrder), controller.delete);
        return router;
    }
}

Object.seal(ClientRoutes);
export = ClientRoutes;
