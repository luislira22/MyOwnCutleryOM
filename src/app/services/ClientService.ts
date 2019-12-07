import ClientRepository = require("./../repository/ClientRepository");
import IClientService = require("./interfaces/ClientService");
import ClientDTO from "../dtos/clients/ClientDTO";
import ClientMapper = require("../mappers/clients/ClientMapper");
import {ClientTokenDTOTrue, ClientTokenDTOFalse, ClientTokenDTO} from "../dtos/clients/ClientTokenDTO";
import Client from "../model/clients2/Client";
import ClientSchema from "../dataAccess/schemas/clients/interfaces/Client";
import jwt = require("jsonwebtoken");
import {SECRET_TOKEN_KEY} from "../../config/secret";


class ClientService implements IClientService {
    private _clientRepository: ClientRepository;

    constructor() {
        this._clientRepository = new ClientRepository();
    }

    create(item: ClientDTO, callback: (error: any, result: any) => void) {
        let clientDomaim = ClientMapper.fromDTOToDomain(item);
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
        })

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
            let token: string = jwt.sign(client.id, SECRET_TOKEN_KEY);
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
    }

    update(_id: string, item: ClientDTO, callback: (error: any, result: any) => void) {
        throw new Error("not implemented")
    }

    updateNameAndAddress(_id: string, item: ClientDTO, callback: (error: any, result: any) => void) {
        this._clientRepository.findById(_id, (err, res) => {
            if (err) callback(err, res);
            else {
                if (item.address.address == undefined || item.address.postalcode == undefined || item.address.city == undefined || item.address.country == undefined ||
                    item.name.firstname == undefined || item.name.lastname == undefined) throw new Error('address and name must be defined');
                item.email = res.email.email;
                item.password = res.password;
                let client = ClientMapper.fromDTOToDomain(item);
                this._clientRepository.update(res._id, ClientMapper.fromDomainToPersistence(client), callback);
            }
        });
    }

    delete(_id: string, callback: (error: any, result: any) => void) {
        this._clientRepository.delete(_id, callback);
    }

    findById(_id: string, callback: (error: any, result: any) => void) {
        this._clientRepository.findById(_id, callback);
    }
}

Object.seal(ClientService);
export = ClientService;
