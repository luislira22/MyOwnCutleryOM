export default class Email  implements ValueObject<Email> {

    private readonly _email: string;

    constructor(email: string) {
        let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(email)) {
            throw new Error('Email does not match email patterns.');
        }
        this._email = email;
    }

    get email(): string {
        return this._email;
    }

    equals(object: Email): boolean {
        return this.email === object.email;
    }
}

Object.seal(Email);
