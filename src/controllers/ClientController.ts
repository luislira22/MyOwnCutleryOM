import express = require("express");

//DOMAIN
import Address from "../model/user/client/Address";
import Fullname from "../model/user/client/Fullname";
//SERVICE
import ClientService = require("../services/users/ClientService");
//DTO
import InputClientDTO from "../dtos/users/clients/InputClientDTO";
//MAPPER
import ClientMapper from "../mappers/users/ClientMapper";
import Client from "../model/user/client/Client";

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

    public async updateNameAndAddres(req: express.Request, res: express.Response): Promise<void> {
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
                res.status(200).send(value);
            }).catch(value => {
                res.status(400).send(value);
            });
        } catch (e) {
            res.status(500).send(e.message);
        }
    }

    async delete(req: express.Request, res: express.Response): Promise<void> {
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

    async findById(req: express.Request, res: express.Response) {
        try {
            //@ts-ignore
            let id = req.decoded.id;
            let clientService = new ClientService();
            clientService.findById(id).then(value => {
                res.status(200).send(ClientMapper.fromDomainToDTO(value));
            }).catch(value => {
                res.status(400).send(value);
            });
        } catch (e) {
            res.status(500).send(e.message);
        }
    }
}


export = ClientController;
