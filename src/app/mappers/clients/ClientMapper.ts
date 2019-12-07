import BaseMapper from "../BaseMapper";
import ClientDTO from "../../dtos/clients/ClientDTO"
import Client from "../../model/clients2/Client";
import Fullname from "../../model/clients2/Fullname";
import Address from "../../model/clients2/Address";
import Email from "../../model/clients2/Email";
import ClientModel from "../../dataAccess/schemas/clients/ClientSchema"
import IClientModel from "../../dataAccess/schemas/clients/interfaces/Client"

class ClientMapper implements BaseMapper<ClientDTO, Client> {

    public static fromDTOToDomain(clientDTO: ClientDTO): Client {
        return new Client(
            new Fullname(clientDTO.name.firstname, clientDTO.name.lastname),
            new Address(clientDTO.address.address, clientDTO.address.postalcode, clientDTO.address.city, clientDTO.address.country),
            new Email(clientDTO.email),
            clientDTO.password
        );
    }

    public static fromDomainToPersistence(client: Client): any {
        let json = {
            name: {
                firstname: client.name.firstname,
                lastname: client.name.lastname
            },
            address: {
                address: client.address.address,
                postalcode: client.address.postalcode,
                city: client.address.city,
                country: client.address.country
            },
            email: {
                email: client.email.email
            },
            password: client.password
        };
        return <IClientModel>json;
        //should be like this: return new ClientModel(json);
    }

    public static fromPersistenceToDomain(iClient: IClientModel) : Client {
        return new Client(
            new Fullname(iClient.name.firstname, iClient.name.lastname),
            new Address(iClient.address.address, iClient.address.postalcode, iClient.address.city, iClient.address.country),
            new Email(iClient.email.email),
            iClient.password,
            iClient.id
        );
    }

    public static toDTO(client: Client): ClientDTO {
        let json = {
            id: client._id,
            name: {
                firstname: client.name.firstname,
                lastname: client.name.lastname
            },
            address: {
                address: client.address.address,
                postalcode: client.address.postalcode,
                city: client.address.city,
                country: client.address.country
            },
            email: client.email.email,
        };
        return <ClientDTO>json;
    }
}

export = ClientMapper
