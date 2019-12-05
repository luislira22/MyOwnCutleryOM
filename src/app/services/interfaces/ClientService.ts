import BaseBusiness = require("./base/BaseService");
import IClientDTO from "../../dtos/clients/ClientDTO";

interface ClientService extends BaseBusiness<IClientDTO> {

}

export = ClientService;
