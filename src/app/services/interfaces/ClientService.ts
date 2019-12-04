import BaseBusiness = require("./base/BaseService");
import IClient = require("../../model/clients/interfaces/client");

interface ClientService extends BaseBusiness<IClient> {

}

export = ClientService;
