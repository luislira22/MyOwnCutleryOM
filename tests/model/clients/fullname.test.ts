import Fullname from "../../../src/model/user/client/Fullname";

describe('Create a valid fullname', () => {
    let fullname = new Fullname('Daniel', 'Craig');
    it('Firstname correct', () => {
        expect(fullname.firstname).toBe('Daniel')
    })
    it('Full correct', () => {
        expect(fullname.lastname).toBe('Craig')
    })
})

describe('Create an invalid fullname', () => {
    it('empty firstname', () => {
        try {
            new Fullname('', 'Craig');
            expect(true).toBe(false)
        }
        catch (e) {
            expect(e.message).toBe('Firstname and Lastname must be greater than 2 chars and less than 100.')
        }
    })
    it('empty lastname', () => {
        try {
            new Fullname('Daniel', '');
            expect(true).toBe(false)
        }
        catch (e) {
            expect(e.message).toBe('Firstname and Lastname must be greater than 2 chars and less than 100.')
        }
    })
    it('empty firstname and lastname', () => {
        try {
            new Fullname('', '');
            expect(true).toBe(false)
        }
        catch (e) {
            expect(e.message).toBe('Firstname and Lastname must be greater than 2 chars and less than 100.')
        }
    })
    it('empty firstname and lastname', () => {
        try {
            new Fullname('', '');
            expect(true).toBe(false)
        }
        catch (e) {
            expect(e.message).toBe('Firstname and Lastname must be greater than 2 chars and less than 100.')
        }
    })
    it('firstname should be greater than 1', () => {
        try {
            new Fullname('D', 'Craig');
            expect(true).toBe(false)
        }
        catch (e) {
            expect(e.message).toBe('Firstname and Lastname must be greater than 2 chars and less than 100.')
        }
    })
    it('lastname should be greater than 1', () => {
        try {
            new Fullname('Daniel', 'C');
            expect(true).toBe(false)
        }
        catch (e) {
            expect(e.message).toBe('Firstname and Lastname must be greater than 2 chars and less than 100.')
        }
    })
})
