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
        let client = ClientMapper.toDomain(item);
        this._clientRepository.create(client, callback);
    }

    retrieve(callback: (error: any, result: any) => void) {
        this._clientRepository.retrieve(callback);
    }

    update(_id: string, item: ClientDTO, callback: (error: any, result: any) => void) {
        /*this._clientRepository.findById(_id, (err, res) => {
            if (err) callback(err, res);

            else
                this._clientRepository.update(res._id, item, callback);
        });*/
        throw new Error("not implemented")
    }

    updateNameAndAddress(_id: string, item: ClientDTO, callback: (error: any, result: any) => void ) {
        this._clientRepository.findById(_id, (err, res) => {
            if (err) callback(err, res);
            else {
                if(item.address.address == undefined || item.address.postalcode == undefined || item.address.city == undefined || item.address.country == undefined ||
                    item.name.firstname == undefined || item.name.lastname == undefined ) {} //throw new Error('address and name must be defined'); //TODO
                //Email
                item.email = res.email[0].email;
                //Password
                item.password = res.password;
                let client = ClientMapper.toDomain(item);
                this._clientRepository.update(res._id, client, callback);
            }
        })
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
