import ClientRepository = require("./../repository/ClientRepository");
import IClientService = require("./interfaces/ClientService");
import ClientDTO = require("../dtos/clients/ClientDTO");
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

    delete(_id: string, callback: (error: any, result: any) => void) {
        //this._clientRepository.delete(_id, callback);
        throw new Error("not implemented")
    }

    findById(_id: string, callback: (error: any, result: any) => void) {
        this._clientRepository.findById(_id, callback);
    }
}


Object.seal(ClientService);
export = ClientService;
