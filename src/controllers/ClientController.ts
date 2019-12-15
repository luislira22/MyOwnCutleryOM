import express = require("express");

//DOMAIN
import Address from "../app/model/user/client/Address";
import Fullname from "../app/model/user/client/Fullname";
//SERVICE
import ClientService = require("../app/services/users/ClientService");
//DTO
import InputClientDTO from "../app/dtos/users/clients/InputClientDTO";
//MAPPER
import ClientMapper from "../app/mappers/users/ClientMapper";

class ClientController {

    async create(req: express.Request, res: express.Response): Promise<void> {
        try {
            let clientDTO: InputClientDTO = <InputClientDTO>req.body;
            let clientService = new ClientService();
            await clientService.create(ClientMapper.fromDTOToDomain(clientDTO)).then(value => {
                //Return client : 201 CREATED
                res.status(201).send(ClientMapper.fromDomainToDTO(value));
            }).catch(value => {
                res.status(400).send(value);
            });
        } catch (e) {
            //Internal server error
            res.status(500).send(e.message);
        }
    }

    async updateNameAndAddres(req: express.Request, res: express.Response): Promise<void> {
        try {
            let client: InputClientDTO = <InputClientDTO>req.body;
            //@ts-ignore
            let _id: string = req.decoded.id;
            let name = new Fullname(
                client.name.firstname,
                client.name.lastname);
            let address = new Address(
                client.address.address,
                client.address.postalcode,
                client.address.city,
                client.address.country);

            let clientService = new ClientService();
            await clientService.updateNameAndAddress(_id, name, address).then(value => {
                //Return client : 200 CREATED
                res.status(201).send(value);
            }).catch(value => {
                res.status(400).send(value);
            });
        } catch (e) {
            res.status(500).send(e.message);
        }
    }

    delete(req: express.Request, res: express.Response): void {
        try {
            //@ts-ignore
            let _id: string = req.decoded.id;
            let clientService = new ClientService();
            clientService.delete(_id).then(value => {
                res.status(204).send(value);
            }).catch(value => {
                res.status(400).send(value);
            })
        } catch (e) {
            res.status(500).send(e.message);
        }
    }

    //TODO nao deve estar disponivel (apenas para testes) remover no futuro
    retrieve(req: express.Request, res: express.Response): void {
        try {
            let clientService = new ClientService();
            clientService.getAll().then(result => {
                let clientsDTO = [];
                result.forEach(function (value) {
                    clientsDTO.push(ClientMapper.fromDomainToDTO(value));
                    res.status(200).send(clientsDTO);
                });
            }).catch(value => {
                res.send(400).send(value);
            });
        } catch (e) {
            res.status(500).send(e.message);
        }
    }

    findById(req: express.Request, res: express.Response): void {
        try {
             //@ts-ignore
             let _id: string = req.decoded.id;
             let clientService = new ClientService();
             clientService.findById(_id).then( value => {
                 res.status(201).send(ClientMapper.fromDomainToDTO(value));
             }).catch(value => {
                 res.status(400).send(value);
             });
         } catch (e) {
            res.status(500).send(e.message);
         }
    }
}

export = ClientController;
