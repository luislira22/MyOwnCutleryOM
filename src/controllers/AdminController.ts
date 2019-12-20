import express = require("express");

//DOMAIN
import Fullname from "../model/user/client/Fullname";
import Address from "../model/user/client/Address";
//SERVICE
import ClientService = require("../services/users/ClientService");
import AdminService = require("../services/users/AdminService");
//DTO
import InputAdminDTO from "../dtos/users/admins/InputAdminDTO";
import InputClientDTO from "../dtos/users/clients/InputClientDTO";
//MAPPER
import AdminMapper from "../mappers/users/AdminMapper";
import ClientMapper from "../mappers/users/ClientMapper";

class AdminController {

    async create(req: express.Request, res: express.Response): Promise<void> {
        try {
            let adminDTO : InputAdminDTO = <InputAdminDTO>req.body;
            let adminService = new AdminService();
            await adminService.create(AdminMapper.fromDTOToDomain(adminDTO)).then(value => {
                //Return client : 201 CREATED
                res.status(201).send(AdminMapper.fromDomainToDTO(value));
            }).catch(value => {
                res.status(400).send(value);
            });
        } catch (e) {
            //Internal server error
            res.status(500).send(e.message);
        }

    }

    public async updateNameAndAddress(req: express.Request, res: express.Response): Promise<void> {
        try {
            let client: InputClientDTO = <InputClientDTO>req.body;
            //@ts-ignore
            let clientId = req.params.clientId;
            let name = new Fullname(
                client.name.firstname,
                client.name.lastname);
            let address = new Address(
                client.address.address,
                client.address.postalcode,
                client.address.city,
                client.address.country);

            let clientService = new ClientService();
            await clientService.updateNameAndAddress(clientId, name, address).then(value => {
                res.status(200).send(value);
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
                res.status(201).send(ClientMapper.fromDomainToNameDTO(value));
            }).catch(value => {
                res.status(400).send(value);
            });

        } catch (e) {
            res.status(500).send(e.message);
        }
    }

    public async retrieveNames(req: express.Request, res: express.Response): Promise<void> {
        try {
            let clientService = new ClientService();
            await clientService.getAll().then(result => {
                let clientsDTO = [];
                result.forEach(function (value) {
                    clientsDTO.push(ClientMapper.fromDomainToNameDTO(value));
                });
                res.status(200).send(clientsDTO);
            }).catch(value => {
                res.send(400).send(value);
            });
        } catch (e) {
            res.status(500).send(e.message);
        }
    }
}


export = AdminController;
