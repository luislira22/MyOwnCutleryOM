import IClientModel = require("./interfaces/Client");
import Fullname = require("./interfaces/Fullname");
import Email = require("./interfaces/Email");
import Address = require("./interfaces/Address");

class Client {

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
}

Object.seal(Client);
export = Client;
