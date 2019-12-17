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

class AdminController {


    async updateNameAndAddress(req: express.Request, res: express.Response): Promise<void> {
        try {
            let client: InputClientDTO = <InputClientDTO>req.body;
            //@ts-ignore
            let id = req.params.id;
            let name = new Fullname(
                client.name.firstname,
                client.name.lastname);
            let address = new Address(
                client.address.address,
                client.address.postalcode,
                client.address.city,
                client.address.country);

            let clientService = new ClientService();
            await clientService.updateNameAndAddress(id, name, address).then(value => {
                //Return client : 200 CREATED
                res.status(201).send(value);
            }).catch(value => {
                res.status(400).send(value);
            });
        } catch (e) {
            res.status(500).send(e.message);
        }
    }


    async findById(req: express.Request, res: express.Response) {
        try {
            //@ts-ignore
            let id = req.params.id;
            let clientService = new ClientService();
            clientService.findById(id).then(value => {
                res.status(201).send(ClientMapper.fromDomainToDTO(value));
            }).catch(value => {
                res.status(400).send(value);
            });

        } catch (e) {
            res.status(500).send(e.message);
        }
    }
}


export = AdminController;
