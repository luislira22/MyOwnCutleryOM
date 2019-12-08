import express = require("express");
import ClientService = require("../app/services/ClientService");
import IBaseController = require("./interfaces/base/BaseController");
import ClientDTO from "../app/dtos/clients/ClientDTO";
import ClientLoginDTO from "../app/dtos/clients/ClientLoginDTO";
import ClientMapper = require("../app/mappers/clients/ClientMapper");


class ClientController implements IBaseController<ClientService> {


    create(req: express.Request, res: express.Response): void {
        try {
            let clientDTO: ClientDTO = <ClientDTO>req.body;
            let clientService = new ClientService();
            clientService.create(clientDTO, (error, result) => {
                if (error) res.status(400).end(error.toString());
                else res.status(201).send(ClientMapper.toDTO(result));
            });
        } catch (e) {
            res.status(400).send(e.message);
        }
    }

    async login(req: express.Request, res: express.Response) {
        try {
            let ClientLoginDTO = <ClientLoginDTO>req.body;
            let clientService = new ClientService();
            let clientTokenDTO;
            await clientService.login(ClientLoginDTO.email, ClientLoginDTO.password).then((clientTokenDTOR) => {
                clientTokenDTO = clientTokenDTOR;
            });
            if (clientTokenDTO.success) res.status(200).send(clientTokenDTO);
            else res.status(404).send(clientTokenDTO);
        } catch (e) {
            res.status(500).send(e.message);
        }
    }

    updateNameAndAddres(req: express.Request, res: express.Response): void {
        try {
            let client: ClientDTO = <ClientDTO>req.body;
            //@ts-ignore
            let _id: string = req.decoded.id;
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
            //@ts-ignore
            let _id: string = req.decoded.id;
            let clientService = new ClientService();
            clientService.delete(_id, (error, result) => {
                if (error) res.status(400).send(error.toString());
                else {
                    res.status(204).send({ "success": "success" });
                }
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
            //@ts-ignore
            let _id: string = req.decoded.id;
            let clientService = new ClientService();
            clientService.findById(_id, (error, result) => {
                if (error) res.status(400).send(error.toString());
                else {
                    if (result == null)
                        res.status(404).send();
                    else {
                        res.status(200).send(ClientMapper.toDTO(result));
                    }
                }
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
