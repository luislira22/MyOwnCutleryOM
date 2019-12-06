import RepositoryBase = require("./base/RepositoryBase");
import ClientSchema from "../dataAccess/schemas/clients/ClientSchema";
import IClientModel from "../dataAccess/schemas/clients/interfaces/Client";

class ClientRepository extends RepositoryBase<IClientModel> {
    constructor() {
        super(ClientSchema);
    }
}

Object.seal(ClientRepository);
export = ClientRepository;
