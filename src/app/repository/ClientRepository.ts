import ClientModel = require("../model/Client");
import IClientModel = require("../model/interfaces/Client");
import ClientSchema = require("./../dataAccess/schemas/ClientSchema");
import RepositoryBase = require("./base/RepositoryBase");

class ClientRepository  extends RepositoryBase<IClientModel> {
    constructor () {
        super(ClientSchema);
    }
}

Object.seal(ClientRepository);
export = ClientRepository;
