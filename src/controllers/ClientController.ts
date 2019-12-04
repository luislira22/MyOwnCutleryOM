import express = require("express");
import ClientService = require("../app/services/ClientService");
import IBaseController = require("./interfaces/base/BaseController");
import IClient = require("../app/model/clients/interfaces/Client");

class HeroController implements IBaseController <ClientService> {

    create(req: express.Request, res: express.Response): void {
        try {
            var client: IClient = <IClient>req.body;
            var clientService = new ClientService();
            clientService.create(client, (error, result) => {
                if (error) res.status(400).end(error.toString());

                else res.send({"success": "success"});
            });
        } catch (e) {
            console.log(e);
            res.send({"error": "error in your request"});

        }
    }

    update(req: express.Request, res: express.Response): void {
        try {
            var client: IClient = <IClient>req.body;
            var _id: string = req.params._id;
            var clientService = new ClientService();
            clientService.update(_id, client, (error, result) => {
                if (error) res.send({"error": "error"});
                else res.send({"success": "success"});
            });
        } catch (e) {
            console.log(e);
            res.send({"error": "error in your request"});

        }
    }

    delete(req: express.Request, res: express.Response): void {
        try {
            var _id: string = req.params._id;
            var clientService = new ClientService();
            clientService.delete(_id, (error, result) => {
                if (error) res.send({"error": "error"});
                else res.send({"success": "success"});
            });
        } catch (e) {
            console.log(e);
            res.send({"error": "error in your request"});

        }
    }

    retrieve(req: express.Request, res: express.Response): void {
        try {
            var clientService = new ClientService();
            clientService.retrieve((error, result) => {
                if (error) res.send({"error": "error"});
                else res.send(result);
            });
        } catch (e) {
            console.log(e);
            res.send({"error": "error in your request"});

        }
    }

    findById(req: express.Request, res: express.Response): void {
        try {
            var _id: string = req.params._id;
            var clientService = new ClientService();
            clientService.findById(_id, (error, result) => {
                if (error) res.send({"error": "error"});
                else res.send(result);
            });
        } catch (e) {
            console.log(e);
            res.send({"error": "error in your request"});

        }
    }


}

export = HeroController;
