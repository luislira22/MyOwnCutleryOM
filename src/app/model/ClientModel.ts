import IClientModel = require("./interfaces/ClientModel");

class ClientModel {

    private _heroModel: IClientModel;

    constructor(heroModel: IClientModel) {
        this._heroModel = heroModel;
    }

    get name(): string {
        return this._heroModel.name;
    }

    get address(): string {
        return this._heroModel.address;
    }

    get email(): string {
        return this._heroModel.email;
    }

    get password(): string {
        return this._heroModel.password;
    }
}

Object.seal(ClientModel);
export = ClientModel;
