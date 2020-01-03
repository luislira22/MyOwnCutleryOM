//DOMAIN
import Client from "../../model/user/client/Client";
import Fullname from "../../model/user/client/Fullname";
import Address from "../../model/user/client/Address";
//REPOSITORY
import ClientRepository from "../../repository/ClientRepository";
import Email from "../../model/user/Email";
import Nif from "../../model/user/client/Nif";
//PERSISTENCE MODELS
const ClientModel = require("../../dataAccess/schemas/users/ClientSchema");
const UserModel = require("../../dataAccess/schemas/users/UserSchema");
//CONFIGS
const config = require("../../config/config");


class ClientService {
    private _clientRepository: ClientRepository;

    constructor() {
        this._clientRepository = new ClientRepository(ClientModel, UserModel);
    }

    async create(client: Client): Promise<Client> {
        return await this._clientRepository.create(client);
    }

    async updateNameAndAddress(id: string, clientName: Fullname, clientAddress: Address): Promise<boolean> {
        let client = await this._clientRepository.findOne(id);
        client.fullname = clientName;
        client.address = clientAddress;
        return await this._clientRepository.update(id, client);
    }

    async delete(id: string): Promise<boolean> {
        let client = await this._clientRepository.findOne(id);

        let deletedClient = new Client(
            new Email(client.id + '@myowncutlery.com'),
            'deleted',
            new Fullname('Deleted', 'Deleted'),
            new Address('Deleted', 'Deleted', 'Deleted', 'Deleted' ),
            new Nif(999999999),
            client.priority
        );
        return await this._clientRepository.update(id, deletedClient);
    }

    async getAll(): Promise<Client[]> {
        return await this._clientRepository.find();
    }

    async findById(id: string): Promise<Client> {
        return await this._clientRepository.findOne(id);
    }

}

Object.seal(ClientService);
export = ClientService;
