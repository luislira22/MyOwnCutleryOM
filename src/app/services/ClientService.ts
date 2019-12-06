import ClientRepository = require("./../repository/ClientRepository");
import IClientService = require("./interfaces/ClientService");
import ClientDTO from "../dtos/clients/ClientDTO";
import ClientMapper = require("../mappers/clients/ClientMapper");


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

    retrieve(callback: (error: any, result: any) => void) {
        this._clientRepository.retrieve(callback);
    }

    update(_id: string, item: ClientDTO, callback: (error: any, result: any) => void) {
        throw new Error("not implemented")
    }

    updateNameAndAddress(_id: string, item: ClientDTO, callback: (error: any, result: any) => void ) {
        this._clientRepository.findById(_id, (err, res) => {
            if (err) callback(err, res);
            else {
                if(item.address.address == undefined || item.address.postalcode == undefined || item.address.city == undefined || item.address.country == undefined ||
                    item.name.firstname == undefined || item.name.lastname == undefined ) throw new Error('address and name must be defined');
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
