import NIF from "../../../src/app/model/clients2/Nif";

test('Create a valid nif', () => {
    new NIF(123456789);
});

describe('Create an invalid nif', () => {
    it('with more than 9 number', () => {
        try {
            new NIF(111111111111111);
            expect(true).toBe(false);
        }
        catch(e) {
            expect(e.message).toBe('Nif must be correct.');
        }
    });
    it('with less than 9 number', () => {
        try {
            new NIF(1111);
            expect(true).toBe(false);
        }
        catch(e) {
            expect(e.message).toBe('Nif must be correct.');
        }
    });
    it('with negative number', () => {
        try {
            new NIF(-1);
            expect(true).toBe(false);
        }
        catch(e) {
            expect(e.message).toBe('Nif must be correct.');
        }
    });
});

