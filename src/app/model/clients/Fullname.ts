import IFullname = require('./interfaces/Fullname');

class Fullname {

    private _fullname: IFullname;

    get firstname(): string {
        return this._fullname.firstname
    }

    get lastname(): string {
        return this._fullname.lastname
    }

    private constructor(fullname: IFullname) {
        if (fullname.firstname === undefined || fullname.firstname === null || fullname.firstname.length <= 2 || fullname.firstname.length > 100 ||
            fullname.lastname === undefined || fullname.lastname === null || fullname.lastname.length <= 2 || fullname.lastname.length > 100) {
            throw new Error('Firstname and Lastname must be greater than 2 chars and less than 100.')
        } else {
            this._fullname = fullname
        }
    }
}

Object.seal(Fullname);
export = Fullname;

