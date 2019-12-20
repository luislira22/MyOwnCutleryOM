import Client from "../../model/user/client/Client";
import * as mongoose from "mongoose";
import Email from "../../model/user/Email";
import IClientModel from "../../dataAccess/schemas/users/interfaces/clients/IClientModel";
import Fullname from "../../model/user/client/Fullname";
import Address from "../../model/user/client/Address";
import Nif from "../../model/user/client/Nif";
import Priority from "../../model/user/client/Priority";
import InputClientDTO from "../../dtos/users/clients/InputClientDTO";
import OutputClientDTO from "../../dtos/users/clients/OutputClientDTO";
import OutputClientNameDTO from "../../dtos/users/clients/OutputClientNameDTO";

export default class ClientMapper {

    public static fromDTOToDomain(clientDTO: InputClientDTO) : Client {
        return (
            new Client(
                new Email(clientDTO.email),
                clientDTO.password,
                new Fullname(clientDTO.name.firstname, clientDTO.name.lastname),
                new Address(clientDTO.address.address, clientDTO.address.postalcode, clientDTO.address.city, clientDTO.address.country),
                new Nif(clientDTO.nif),
                new Priority(1),
            )
        )
    }

    public static fromDomainToDTO(client : Client) : OutputClientDTO {
        return ({
            //user
            email: client.email.email,
            //client
            name: {
                firstname: client.fullname.firstname,
                lastname: client.fullname.lastname
            },
            address: {
                address: client.address.address,
                postalcode: client.address.postalcode,
                city: client.address.city,
                country: client.address.country
            },
            nif: client.nif.value
        });
    }

    public static fromDomainToNameDTO(client: Client) : OutputClientNameDTO {
        return({
            id: client.id,
            name: {
                firstname: client.fullname.firstname,
                lastname: client.fullname.lastname
            }
        })
    }

    public static fromDomainToPersistence(client: Client): mongoose.Model<IClientModel> {
        return ({
            //user
            // @ts-ignore
            email: client.email.email,
            password: client.password,
            //client
            fullname: {
                firstname: client.fullname.firstname,
                lastname: client.fullname.lastname
            },
            address: {
                address: client.address.address,
                postalcode: client.address.postalcode,
                city: client.address.city,
                country: client.address.country
            },
            nif: client.nif.value,
            priority: client.priority.value
        });
    }

    public static fromPersistenceToDomain(clientModel: IClientModel): Client {
        return new Client(
            new Email(clientModel.email),
            clientModel.password,
            new Fullname(clientModel.fullname.firstname, clientModel.fullname.lastname),
            new Address(clientModel.address.address, clientModel.address.postalcode, clientModel.address.city, clientModel.address.country),
            new Nif(clientModel.nif),
            new Priority(clientModel.priority),
            clientModel.role,
            clientModel.id,
        );
    }
}
