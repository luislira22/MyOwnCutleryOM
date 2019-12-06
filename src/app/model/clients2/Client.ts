import Fullname from "./Fullname";
import Address from "./Address";
import Email from "./Email";

export default class Client implements AggregateRoot<Client> {

    _id: string;
    _name: Fullname;
    _address: Address;
    _email: Email;
    _password: string;

    constructor(fullname: Fullname, address: Address, email: Email, password: string, id?: string) {
        if (fullname === undefined || fullname === null ||
            address === undefined || address === null ||
            email === undefined || email === null ||
            password === undefined || password === null || password.length <= 2 || password.length > 100) {
            throw new Error('Values cannot be null or undefined.');
        }
        this._id = id; //MAYBE NEED TO BE FIXED
        this._name = fullname;
        this._address = address;
        this._email = email;
        this._password = password;
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
