import Fullname from "./Fullname";
import Address from "./Address";
import Email from "./Email";
import NIF from "./NIF";
import Role from "./Role";

export default class Client implements AggregateRoot<Client> {

    _id: string;
    _name: Fullname;
    _address: Address;
    _email: Email;
    _password: string;
    _nif: NIF;
    _role: Role;

    constructor(fullname: Fullname, address: Address, email: Email, password: string, nif: NIF, role: Role, id?: string) {
        if (fullname === undefined || fullname === null ||
            address === undefined || address === null ||
            email === undefined || email === null ||
            nif === undefined || nif === null ||
            password === undefined || password === null || password.length <= 2 || password.length > 100) {
            throw new Error('Values cannot be null or undefined.');
        }
        this._id = id;
        this._name = fullname;
        this._address = address;
        this._email = email;
        this._password = password;
        this._nif = nif;
        if(role === null || role === undefined) this._role = new Role("CLIENT");
        else this._role = role;
    }

    get id(): string {
        return this._id;
    }

    get name(): Fullname {
        return this._name;
    }

    get address(): Address {
        return this._address;
    }

    get email(): Email {
        return this._email;
    }

    get password(): string {
        return this._password;
    }

    get nif(): NIF {
        return this._nif;
    }

    get role(): Role {
        return this._role;
    }

    set role(role: Role) {
        this._role = role;
    }

    equals(object: Client): boolean {
        return this.name.equals(object.name)
            && this.address.equals(object.address)
            && this.email.equals(object.email)
            && this.password === object.password;
    }

    isEntity(): boolean {
        return this.id != undefined;
    }
}

Object.seal(Client);
