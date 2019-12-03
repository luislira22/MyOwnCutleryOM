import { Address } from '../../../src/models/clients/address'

describe('Create a valid address', () => {
    let address = Address.create('Rua da Avenida', '4010-200', 'Porto', 'Portugal')
    it('Address correct', () => {
        expect(address.address).toBe('Rua da Avenida')
    })
    it('Postalcode correct', () => {
        expect(address.postalcode).toBe('4010-200')
    })
    it('City correct', () => {
        expect(address.city).toBe('Porto')
    })
    it('Country correct', () => {
        expect(address.country).toBe('Portugal')
    })

})

describe('Create an invalid address', () => {
    it('empty address', () => {
        try {
            Address.create('', '4010-200', 'Porto', 'Portugal')
            expect(true).toBe(false)
        }
        catch (e) {
            expect(e.message).toBe('Address, city, postalcode and country must be filled.')
        }
    })
    it('empty postalcode', () => {
        try {
            Address.create('Rua da Avenida', '', 'Porto', 'Portugal')
            expect(true).toBe(false)
        }
        catch (e) {
            expect(e.message).toBe('Address, city, postalcode and country must be filled.')
        }
    })
    it('empty city', () => {
        try {
            Address.create('Rua da Avenida', '4010-200', '', 'Portugal')
            expect(true).toBe(false)
        }
        catch (e) {
            expect(e.message).toBe('Address, city, postalcode and country must be filled.')
        }
    })
    it('empty country', () => {
        try {
            Address.create('Rua da Avenida', '4010-200', 'Porto', '')
            expect(true).toBe(false)
        }
        catch (e) {
            expect(e.message).toBe('Address, city, postalcode and country must be filled.')

        }
    })
    it('address should be greater than 1', () => {
        try {
            Address.create('R', '4010-200', 'Porto', 'Portugal')
            expect(true).toBe(false)
        }
        catch (e) {
            expect(e.message).toBe('Address, city, postalcode and country must be filled.')
        }
    })
    it('address should not be undefined', () => {
        try {
            Address.create(null, '4010-200', 'Porto', 'Portugal')
            expect(true).toBe(false)
        }
        catch (e) {
            expect(e.message).toBe('Address, city, postalcode and country must be filled.')
        }
    })
})