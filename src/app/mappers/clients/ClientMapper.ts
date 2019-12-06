import ClientDTO from "../../dtos/clients/ClientDTO"
import {BaseMapper} from "../BaseMapper";
import IClient = require("../../model/clients/interfaces/Client");
import * as mongoose from "mongoose";


class ClientMapper implements BaseMapper<IClient,ClientDTO> {

    public static toPersistence(client: IClient): any {
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

    public static toDomain(clientDTO: ClientDTO): IClient {
        let json = {
            name: {
                firstname: clientDTO.name.firstname,
                lastname: clientDTO.name.lastname
            },
            address: {
                address: clientDTO.address.address,
                postalcode: clientDTO.address.postalcode,
                city: clientDTO.address.city,
                country: clientDTO.address.country
            },
            email: {
                email: clientDTO.email
            },
            password: clientDTO.password
        };
        return <IClient>json;
    }

    public static toDTO(client: IClient): ClientDTO {
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
