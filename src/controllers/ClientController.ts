import express = require("express");
import ClientService = require("../app/services/ClientService");
import IBaseController = require("./interfaces/base/BaseController");
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
            res.send(e.message);
        }
    }

    updateNameAndAddres(req: express.Request, res: express.Response): void {
        try {
            let client: ClientDTO = <ClientDTO>req.body;
            let _id: string = req.params._id;
            let clientService = new ClientService();
            clientService.updateNameAndAddress(_id, client, (error, result) => {
                if (error) res.status(400).send();
                else res.status(200).send(result);
            });
        } catch (e) {
            res.send(e.message);
        }
    }

    delete(req: express.Request, res: express.Response): void {
        try {
            let _id: string = req.params._id;
            let clientService = new ClientService();
            clientService.delete(_id, (error, result) => {
                if (error) res.status(400).send(error.toString());
                else res.status(200).send({"success": "success"});
            });
        } catch (e) {
            res.send(e.message);
        }
    }

    retrieve(req: express.Request, res: express.Response): void {
        try {
            let clientService = new ClientService();
            clientService.retrieve((error, result) => {
                if (error) res.status(400).end(error.toString());
                else {
                    let fullReponse = [];
                    result.forEach(function (value) {
                        fullReponse.push(ClientMapper.toDTO(value))
                    });
                    res.status(200).send(fullReponse);
                }
            });
        } catch (e) {
            res.send(e.message);
        }
    }

    findById(req: express.Request, res: express.Response): void {
        try {
            let _id: string = req.params._id;
            let clientService = new ClientService();
            clientService.findById(_id, (error, result) => {
                if (error) res.status(400).send(error.toString());
                else res.send(ClientMapper.toDTO(result));
            });
        } catch (e) {
            res.send(e.message);
        }
    }

    update(req: express.Request, res: express.Response): void {
        throw new Error('not implemented');
    }
}

export = ClientController;
