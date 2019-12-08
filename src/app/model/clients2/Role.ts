import {UserRole} from "./enum/UserRole";

export default class Role implements ValueObject<Role> {

    private readonly _role: UserRole;

    get role(): UserRole {
        return this._role;
    }

    constructor(status: string) {
        if (status.toUpperCase() === "ADMIN") this._role = UserRole.Admin;
        else if (status.toUpperCase() === "CLIENT") this._role = UserRole.Client;
        else throw new Error('Should have 1 user role');
    }

    equals(object: Role): boolean {
        return this.role === object.role;
    }
}

Object.seal(Role);

