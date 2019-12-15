import ClientRepository = require("../repository/ClientRepository");
import IClientService = require("./interfaces/ClientService");
import ClientDTO from "../dtos/clients/ClientDTO";
import ClientMapper = require("../mappers/clients/ClientMapper");
import {ClientTokenDTOTrue, ClientTokenDTOFalse, ClientTokenDTO} from "../dtos/clients/ClientTokenDTO";
import Client from "../model/clients2/Client";
import ClientSchema from "../dataAccess/schemas/clients/interfaces/Client";
import jwt = require("jsonwebtoken");
import {SECRET_TOKEN_KEY} from "../../config/secret";
import Role from "../model/clients2/Role";
import {message} from "gulp-typescript/release/utils";
import Email from "../model/clients2/Email";
import Fullname from "../model/clients2/IFullname";
import Address from "../model/clients2/IAddress";


class ClientService implements IClientService {
    private _clientRepository: ClientRepository;

    constructor() {
        this._clientRepository = new ClientRepository();
    }

    create(item: ClientDTO, callback: (error: any, result: any) => void) {
        let clientDomaim: Client = ClientMapper.fromDTOToDomain(item);
        let clientPersistence = ClientMapper.fromDomainToPersistence(clientDomaim);
        this._clientRepository.create(clientPersistence, callback);
    }

    async login(email: string, insertedPassword: string): Promise<ClientTokenDTO> {

        let fetchDataPromise = new Promise((resolve, reject) => {
            this._clientRepository.findClientByEmail(email, (error, client) => {
                if (error) {
                    throw new Error("error acessing database");
                }
                if (client == null)
                    reject("");
                else
                    resolve(client);
            })
        });

        let client: Client;

        client = await fetchDataPromise.then((clientPersistence: ClientSchema) => {
            return ClientMapper.fromPersistenceToDomain(clientPersistence);
        }).catch((message) => {
            return null;
        });
        if (client == null) {
            return this.falseTokenDTO("invalid email, client not found");
        }

        //define id and password
        let password = client.password;

        if (insertedPassword === password) {
            let payload = {id: client.id};
            let token: string = jwt.sign(payload, SECRET_TOKEN_KEY);
            return this.trueTokenDTO("login sucessful", token);
        } else {
            return this.falseTokenDTO("invalid password");
        }
    }


    private falseTokenDTO(message: string): ClientTokenDTO {
        let clientTokenDTO: ClientTokenDTOFalse;
        clientTokenDTO =
            {
                success: false,
                message: message
            };
        return clientTokenDTO;
    }

    private trueTokenDTO(message: string, token: string): ClientTokenDTO {
        let clientTokenDTO: ClientTokenDTOTrue;
        clientTokenDTO =
            {
                success: true,
                message: message,
                token: token,
            };
        return clientTokenDTO;
    }

    retrieve(callback: (error: any, result: any) => void) {
        this._clientRepository.retrieve(callback);
        //TODO not retrieve
    }

    update(_id: string, item: ClientDTO, callback: (error: any, result: any) => void) {
        callback("Not implemented", null)
    }

    async updateNameAndAddress(_id: string, item: ClientDTO, callback: (error: any, result: any) => void) {
        let getClient = new Promise((resolve, reject) => {
            this.findById(_id, (error: any, client: Client) => {
                if (error || client == null) reject("Client does not exists");
                resolve(client);
            })
        });

        let client: Client = <Client>await getClient.then((client: Client) => {
            return client;
        }).catch((message) => {
            callback(message, null);
        });

        try {
            if (item.address != undefined && item.name.firstname != undefined && item.name.lastname != undefined) {
                client.address = new Address(item.address.address,item.address.postalcode,item.address.city,item.address.country);
                client.name = new Fullname(item.name.firstname, item.name.lastname);
            } 
            else callback("Email/Name must be defined", null);
            console.log(client)
            let clientPersistence = ClientMapper.fromDomainToPersistence(client);
            // @ts-ignore
            this._clientRepository.update(_id,clientPersistence, callback);
        } catch (e) {
            callback(e.message, null);
        }
    }

    delete(_id: string, callback: (error: any, result: any) => void) {
        this._clientRepository.delete(_id, callback);
    }

    findById(_id: string, callback: (error: any, result: any) => void) {
        this._clientRepository.findById(_id, (error2, result2) => {
            if (error2) callback(error2, null);
            else callback(null, ClientMapper.fromPersistenceToDomain(result2));
        });
    }
}

Object.seal(ClientService);
export = ClientService;
