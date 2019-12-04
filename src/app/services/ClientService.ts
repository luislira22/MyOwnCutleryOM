import ClientRepository = require("./../repository/ClientRepository");
import IClientService = require("./interfaces/ClientService");
import IClient = require("../model/clients/interfaces/Client");

class ClientService  implements IClientService {
    private _clientRepository: ClientRepository;

    constructor () {
        this._clientRepository = new ClientRepository();
    }

    create (item: IClient, callback: (error: any, result: any) => void) {
        this._clientRepository.create(item, callback);
    }

    retrieve (callback: (error: any, result: any) => void) {
         this._clientRepository.retrieve(callback);
    }

    update (_id: string, item: IClient, callback: (error: any, result: any) => void) {

        this._clientRepository.findById(_id, (err, res) => {
            if(err) callback(err, res);

            else
                this._clientRepository.update(res._id, item, callback);
        });
    }

    delete (_id: string, callback:(error: any, result: any) => void) {
        this._clientRepository.delete(_id , callback);
    }

    findById (_id: string, callback: (error: any, result: IClient) => void) {
        this._clientRepository.findById(_id, callback);
    }
}


Object.seal(ClientService);
export = ClientService;
