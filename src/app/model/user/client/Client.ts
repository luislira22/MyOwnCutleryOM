import User from "../User";
import Address from "./Address";
import Email from "../Email";
import Nif from "./Nif";
import Fullname from "./Fullname";
import Priority from "./Priority";

export default class Client extends User {

    private _fullname: Fullname;
    private _address: Address;
    _nif: Nif;
    _priority: Priority;

    constructor(email: Email, password: string, fullname: Fullname, address: Address, nif: Nif, priority: Priority, role?: string, id?: string) {
        if (fullname == null || address == null || nif == null) throw new Error("Error creating user");
        super(email, password, role, id);
        this._fullname = fullname;
        this._address = address;
        this._nif = nif;
        this._priority = priority;
    }

    get id() {
        return this._id;
    }

    get email() {
        return this._email;
    }

    get fullname() {
        return this._fullname;
    }


    set fullname(value: Fullname) {
        this._fullname = value;
    }

    get address() {
        return this._address;
    }

    set address(value: Address) {
        this._address = value;
    }

    get nif() {
        return this._nif;
    }

    get priority() {
        return this._priority;
    }
}
