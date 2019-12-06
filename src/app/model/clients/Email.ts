import IEmail = require('./interfaces/Email');

class Email implements ValueObject<Email> {

    private _email: IEmail;

    get email(): string {
        return this._email.email
    }

    constructor(email: IEmail) {
        let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(email.email)) {
            throw new Error('Email does not match email patterns.');
        } else {
            this._email = email
        }
    }

    equals(object: Email): boolean {
        return this.email === object.email;
    }
}

Object.seal(Email);
export = Email;

