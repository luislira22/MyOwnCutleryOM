import Address from "../../../src/app/model/clients2/IAddress";

describe('Create a valid address', () => {
    let address = new Address('Rua da Avenida', '4010-200', 'Porto', 'Portugal')
    it('IAddress correct', () => {
        expect(address.address).toBe('Rua da Avenida')
    });
    it('Postalcode correct', () => {
        expect(address.postalcode).toBe('4010-200')
    });
    it('City correct', () => {
        expect(address.city).toBe('Porto')
    });
    it('Country correct', () => {
        expect(address.country).toBe('Portugal')
    });
});

describe('Create an invalid address', () => {
    it('empty address', () => {
        try {
            new Address('', '4010-200', 'Porto', 'Portugal')
            expect(true).toBe(false)
        }
        catch (e) {
            expect(e.message).toBe('IAddress, city, postalcode and country must be filled.')
        }
    });
    it('empty postalcode', () => {
        try {
            new Address('Rua da Avenida', '', 'Porto', 'Portugal')
            expect(true).toBe(false)
        }
        catch (e) {
            expect(e.message).toBe('IAddress, city, postalcode and country must be filled.')
        }
    });
    it('empty city', () => {
        try {
            new Address('Rua da Avenida', '4010-200', '', 'Portugal')
            expect(true).toBe(false)
        }
        catch (e) {
            expect(e.message).toBe('IAddress, city, postalcode and country must be filled.')
        }
    });
    it('empty country', () => {
        try {
            new Address('Rua da Avenida', '4010-200', 'Porto', '')
            expect(true).toBe(false)
        }
        catch (e) {
            expect(e.message).toBe('IAddress, city, postalcode and country must be filled.')

        }
    });
    it('address should be greater than 1', () => {
        try {
            new Address('R', '4010-200', 'Porto', 'Portugal')
            expect(true).toBe(false)
        }
        catch (e) {
            expect(e.message).toBe('IAddress, city, postalcode and country must be filled.')
        }
    });
    it('address should not be undefined', () => {
        try {
            new Address(null, '4010-200', 'Porto', 'Portugal')
            expect(true).toBe(false)
        }
        catch (e) {
            expect(e.message).toBe('IAddress, city, postalcode and country must be filled.')
        }
    });
});
