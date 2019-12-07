import ClientRepository = require("./../repository/ClientRepository");
import IClientService = require("./interfaces/ClientService");
import ClientDTO from "../dtos/clients/ClientDTO";
import ClientMapper = require("../mappers/clients/ClientMapper");
import {ClientTokenDTOTrue,ClientTokenDTOFalse,ClientTokenDTO} from "../dtos/clients/ClientTokenDTO";
import Client from "../model/clients2/Client";


class ClientService implements IClientService {
    private _clientRepository: ClientRepository;

    constructor() {
        this._clientRepository = new ClientRepository();
    }

    create(item: ClientDTO, callback: (error: any, result: any) => void) {
        let clientDomaim = ClientMapper.fromDTOToDomain(item);
        let clientPersistence = ClientMapper.fromDomainToPersistence(clientDomaim);
        this._clientRepository.create(clientPersistence, callback);
    }

    async login(email : string, insertedPassword: string):Promise<ClientTokenDTO>{

        let password;
        let id;

        let fetchDataPromise = new Promise((resolve,reject) =>{
            this._clientRepository.findClientByEmail(email,(error,client)=>{
                if(error){
                    reject("database acess error");
                }
                if(client == null)
                    reject("client not found");
                else{
                    id = client._id;
                    password = client.password;
                    resolve();
                }
            })
        })

        await fetchDataPromise.catch((message) =>{
            console.log(message)
        })

        if(password == null){
            return this.falseTokenDTO("invalid email");
        }

        if(insertedPassword === password){
            //make token here
            return this.trueTokenDTO("login sucessful",id,"12345678");
        }
        else{
            return this.falseTokenDTO("invalid password");
        }
    }



    falseTokenDTO(message : string) : ClientTokenDTO{
        let clientTokenDTO : ClientTokenDTOFalse;
        clientTokenDTO =
        {
            success:false,
            message:message
        }
        return clientTokenDTO;
    }
    trueTokenDTO(message : string,id : string,token : string) : ClientTokenDTO{
        let clientTokenDTO : ClientTokenDTOTrue;
        clientTokenDTO =
        {
            success:true,
            message:message,
            token: token,
            id: id
        }
        return clientTokenDTO;
    }

    retrieve(callback: (error: any, result: any) => void) {
        this._clientRepository.retrieve(callback);
        //TODO not retrieve
    }

    update(_id: string, item: ClientDTO, callback: (error: any, result: any) => void) {
        throw new Error("not implemented")
    }

    updateNameAndAddress(_id: string, item: ClientDTO, callback: (error: any, result: any) => void ) {
        //FIX
        this._clientRepository.findById(_id, (err, res) => {
            if (err) callback(err, res);
            else {
                if(item.address.address == undefined || item.address.postalcode == undefined || item.address.city == undefined || item.address.country == undefined ||
                    item.name.firstname == undefined || item.name.lastname == undefined ) throw new Error('address and name must be defined');
                item.email = res.email.email;
                item.password = res.password;
                let client = ClientMapper.fromDTOToDomain(item);
                this._clientRepository.update(res._id, ClientMapper.fromDomainToPersistence(client), callback);
            }
        });
    }

    delete(_id: string, callback: (error: any, result: any) => void) {
        this._clientRepository.delete(_id, callback);
    }

    findById(_id: string, callback: (error: any, result: any) => void) {
        this._clientRepository.findById(_id, (error2, result2) => {
            if(error2) callback(error2, null);
            else callback(null, ClientMapper.fromPersistenceToDomain(result2))
        });
    }
}

Object.seal(ClientService);
export = ClientService;
