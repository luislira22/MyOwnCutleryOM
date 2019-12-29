import Nif from "../../../src/model/user/client/Nif";

test('Create a valid Nif', () => {
    new Nif(123456789);
});

describe('Create an invalid Nif', () => {
    it('with more than 9 number', () => {
        try {
            new Nif(111111111111111);
            expect(true).toBe(false);
        }
        catch(e) {
            expect(e.message).toBe('Nif must be correct.');
        }
    });
    it('with less than 9 number', () => {
        try {
            new Nif(1111);
            expect(true).toBe(false);
        }
        catch(e) {
            expect(e.message).toBe('Nif must be correct.');
        }
    });
    it('with negative number', () => {
        try {
            new Nif(-1);
            expect(true).toBe(false);
        }
        catch(e) {
            expect(e.message).toBe('Nif must be correct.');
        }
    });
});

