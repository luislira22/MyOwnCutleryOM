import { Client } from '../../../src/models/clients/client'
import { Email } from '../../../src/models/clients/email'
import { Fullname } from '../../../src/models/clients/fullname'
import { Address } from '../../../src/models/clients/address'

describe('Create a valid client', () => {
    let client = Client.create({
        'address': Address.create('Rua da Avenida', '4010-200', 'Porto', 'Portugal'),
        'email': Email.create('daniel.craig@mail.co.uk'),
        'fullname': Fullname.create('Daniel', 'Craig'),
        'password': '1234IsABadPassword',
    })
    it('Address is set', () => {
        expect(client.getValue().address).toEqual(Address.create('Rua da Avenida', '4010-200', 'Porto', 'Portugal'))
    })
    it('Email is set', () => {
        expect(client.getValue().email).toEqual(Email.create('daniel.craig@mail.co.uk'))
    })
    it('Fullname is set', () => {
        expect(client.getValue().fullname).toEqual(Fullname.create('Daniel', 'Craig'))
    })
})