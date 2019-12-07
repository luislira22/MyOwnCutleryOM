import IClientModel from "../dataAccess/schemas/clients/interfaces/Client";
import ClientSchema from "../dataAccess/schemas/clients/ClientSchema"
import RepositoryBase = require("./base/RepositoryBase");

class ClientRepository extends RepositoryBase<IClientModel> {
    constructor() {
        super(ClientSchema);
    }
    
    findClientByEmail(email : string,callback: (error: any, result: any) => void){
        this._model.findOne({email:{email: email}},callback)
    }
}

Object.seal(ClientRepository);
export = ClientRepository;
