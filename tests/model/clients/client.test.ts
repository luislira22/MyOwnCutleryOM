import Client from "../../../src/app/model/clients2/Client";
import Fullname from "../../../src/app/model/clients2/Fullname";
import Address from "../../../src/app/model/clients2/Address";
import Email from "../../../src/app/model/clients2/Email";
import NIF from "../../../src/app/model/clients2/NIF";
import Role from "../../../src/app/model/clients2/Role";

describe('Create a valid client', () => {
    let fullname = new Fullname('Daniel', 'Craig');
    let address = new Address('Rua da Avenida', '4010-200', 'Porto', 'Portugal');
    let email = new Email('daniel.craig@mail.co.uk');
    let nif = new NIF(123456789);
    let password = "12345678";
    let client = new Client(
        fullname,
        address,
        email,
        password,
        nif,
        null,
    );
    it('Address is set', () => {
        expect(client.address).toEqual(address);
    });
    it('Email is set', () => {
        expect(client.email).toEqual(email);
    });
    it('Name is set', () => {
        expect(client.name).toEqual(fullname);
    });
    it('Password is set', () => {
        expect(client.password).toEqual(password);
    });
    it('Nif is set', () => {
        expect(client.nif).toEqual(nif);
    });
    it('Role is client', () => {
        expect(client.role).toEqual(new Role("Client"));
    });
});
