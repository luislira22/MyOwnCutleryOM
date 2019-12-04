import BaseBusiness = require("./base/BaseService");
import IClientDTO = require("../../dtos/clients/ClientDTO");

interface ClientService extends BaseBusiness<IClientDTO> {

}

export = ClientService;
