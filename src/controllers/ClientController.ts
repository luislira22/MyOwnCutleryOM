import express = require("express");
import ClientService = require("../app/services/ClientService");
import IBaseController = require("./interfaces/base/BaseController");
import IClient = require("../app/model/clients/interfaces/Client");
import ClientDTO from "../app/dtos/clients/ClientDTO";
import ClientMapper = require("../app/mappers/clients/ClientMapper");

class ClientController implements IBaseController <ClientService> {

    create(req: express.Request, res: express.Response): void {
        try {
            let clientDTO: ClientDTO = <ClientDTO>req.body;
            let clientService = new ClientService();
            clientService.create(clientDTO, (error, result) => {
                if (error) res.status(400).end(error.toString());
                else res.status(201).send(ClientMapper.toDTO(result));
            });
        } catch (e) {
            res.send({"error": "error in your request"});
        }
    }

    updateNameAndAddress(req: express.Request, res: express.Response) : void {
        throw new Error('Not implemented');
       /* try {
            let _id: string = req.params._id;
            let clientService = new ClientService();
        }*/
    }

    update(req: express.Request, res: express.Response): void {
        throw new Error('Not implemented');
        /*try {
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
        }*/
    }

    delete(req: express.Request, res: express.Response): void {
        throw new Error('Not implemented');
        /*try {
            var _id: string = req.params._id;
            var clientService = new ClientService();
            clientService.delete(_id, (error, result) => {
                if (error) res.send({"error": "error"});
                else res.send({"success": "success"});
            });
        } catch (e) {
            console.log(e);
            res.send({"error": "error in your request"});

        }*/
    }

    retrieve(req: express.Request, res: express.Response): void {
        throw new Error('Not implemented');
        /*try {
            var clientService = new ClientService();
            clientService.retrieve((error, result) => {
                if (error) res.send({"error": "error"});
                else res.send(result);
            });
        } catch (e) {
            console.log(e);
            res.send({"error": "error in your request"});

        }*/
    }

    findById(req: express.Request, res: express.Response): void {
        throw new Error('Not implemented');
       /* try {
            var _id: string = req.params._id;
            var clientService = new ClientService();
            clientService.findById(_id, (error, result) => {
                if (error) res.send({"error": "error"});
                else res.send(result);
            });
        } catch (e) {
            console.log(e);
            res.send({"error": "error in your request"});

        }*/
    }
}

export = ClientController;
