import User from "../User";
import Email from "../Email";

export default class Admin extends User {

    constructor(email: Email, password: string, role?: string, id?: string) {
        super(email, password, role, id);
    }
}
