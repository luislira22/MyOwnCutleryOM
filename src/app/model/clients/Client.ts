import IClientModel = require("./interfaces/Client");
import Fullname = require("./interfaces/Fullname");
import Email = require("./interfaces/Email");
import Address = require("./interfaces/Address");

class Client implements AggregateRoot<Client> {

    private _client: IClientModel;

    constructor(heroModel: IClientModel) {
        this._client = heroModel;
    }

    get name(): Fullname {
        return this._client.name;
    }

    get address(): Address {
        return this._client.address;
    }

    get email(): Email {
        return this._client.email;
    }

    get password(): string {
        return this._client.password;
    }


    equals(object: Client): boolean {
        if (object == null) return false;
        if (this === object) return true;
        if (!this.isEntity()) return false;
        return this._client.id.equals(object._client.id);
    }

    isEntity(): boolean {
        return this._client.id != undefined;
    }
}

Object.seal(Client);
export = Client;
