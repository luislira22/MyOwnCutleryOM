import Email from "./Email";

export default abstract class User {
    _id: string;
    _email: Email;
    _password: string;
    readonly _role: string;

    protected constructor(email: Email, password: string, role?: string, id?: string) {
        if (email == null) throw new Error("Error creating user");
        this._id = id;
        this._role = role;
        this._email = email;
        this._password = password;
    }

    get id(): string {
        return this._id;
    }

    get role(): string {
        return this._role;
    }

    get email(): Email {
        return this._email;
    }

    get password(): string {
        return this._password;
    }
}
