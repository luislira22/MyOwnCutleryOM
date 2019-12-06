export default class Fullname implements ValueObject<Fullname> {

    _firstname: string;
    _lastname: string;

    constructor(firstname: string, lastname: string) {
        if (firstname === undefined || firstname === null || firstname.length <= 2 || firstname.length > 100 ||
            lastname === undefined || lastname === null || lastname.length <= 2 || lastname.length > 100) {
            throw new Error('Firstname and Lastname must be greater than 2 chars and less than 100.');
        }
        this._firstname = firstname;
        this._lastname = lastname;
    }

    get firstname(): string {
        return this._firstname;
    }

    get lastname(): string {
        return this._lastname;
    }

    equals(object: Fullname): boolean {
        return this.firstname === object.firstname
            && this.lastname === object.lastname;
    }
}

Object.seal(Fullname);

