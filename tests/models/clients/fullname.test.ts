import { Fullname } from '../../../src/models/clients/fullname'

describe('Create a valid fullname', () => {
    let fullname = Fullname.create('Daniel', 'Craig')
    it('Address correct', () => {
        expect(fullname.firstname).toBe('Daniel')
    })
    it('Postalcode correct', () => {
        expect(fullname.lastname).toBe('Craig')
    })
})

describe('Create an invalid fullname', () => {
    it('empty firstname', () => {
        try {
            Fullname.create('', 'Craig')
            expect(true).toBe(false)
        }
        catch (e) {
            expect(e.message).toBe('Firstname and Lastname must be greater than 2 chars and less than 100.')
        }
    })
    it('empty lastname', () => {
        try {
            Fullname.create('Daniel', '')
            expect(true).toBe(false)
        }
        catch (e) {
            expect(e.message).toBe('Firstname and Lastname must be greater than 2 chars and less than 100.')
        }
    })
    it('empty firstname and lastname', () => {
        try {
            Fullname.create('', '')
            expect(true).toBe(false)
        }
        catch (e) {
            expect(e.message).toBe('Firstname and Lastname must be greater than 2 chars and less than 100.')
        }
    })
    it('empty firstname and lastname', () => {
        try {
            Fullname.create('', '')
            expect(true).toBe(false)
        }
        catch (e) {
            expect(e.message).toBe('Firstname and Lastname must be greater than 2 chars and less than 100.')
        }
    })
    it('firstname should be greater than 1', () => {
        try {
            Fullname.create('D', 'Craig')
            expect(true).toBe(false)
        }
        catch (e) {
            expect(e.message).toBe('Firstname and Lastname must be greater than 2 chars and less than 100.')
        }
    })
    it('lastname should be greater than 1', () => {
        try {
            Fullname.create('Daniel', 'C')
            expect(true).toBe(false)
        }
        catch (e) {
            expect(e.message).toBe('Firstname and Lastname must be greater than 2 chars and less than 100.')
        }
    })
})
