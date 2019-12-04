import Client from "../../model/clients/interfaces/Client";
import ClientDTO from "../../dtos/clients/ClientDTO"
import {BaseMapper} from "../BaseMapper";


class ClientMapper extends BaseMapper<Client> {

    public static toPersistence(client: Client): any {
        //tojson
        return {
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
            mail: {
                email: client.email.email
            },
            password: client.password
        }
    }

    public static toDomain(raw: any): Client {
        return null
    }

    public static toDTO(client: Client): ClientDTO {
        return null;
    }
}

export = ClientMapper
