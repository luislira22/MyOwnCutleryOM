import ClientModel = require("./../model/ClientModel");
import IClientModel = require("./../model/interfaces/ClientModel");
import ClientSchema = require("./../dataAccess/schemas/ClientSchema");
import RepositoryBase = require("./base/RepositoryBase");

class ClientRepository  extends RepositoryBase<IClientModel> {
    constructor () {
        super(ClientSchema);
    }
}

Object.seal(ClientRepository);
export = ClientRepository;
