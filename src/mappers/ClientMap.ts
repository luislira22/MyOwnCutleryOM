import { Mapper } from "../core/infra/Mapper"
import { Client } from "../models/clients/client"

export class ClientMap extends Mapper<Client> {

    public static toPersistence(client: Client): any {
        return {
            id: client.id,
            email: client.email.value,
            fullname: client.fullname.value,
            address: client.address.value,
            password: client.password.toString
        }
    }

    public static toDomain(raw: any): Client {
        //TODO
        return null
    }
}