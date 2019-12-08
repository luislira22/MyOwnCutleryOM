import Email from '../../../src/app/model/clients2/Email';

test('Create a valid email', () => {
    new Email('email@email.com');
});

describe('Create an invalid email', () => {
    it('without @', () => {
        try {
            new Email('emailemail.com');
            expect(true).toBe(false);
        }
        catch(e) {
            expect(e.message).toBe('Email does not match email patterns.');
        }
    });
    it('without .', () => {
        try {
            new Email('email@emailcom');
            expect(true).toBe(false);
        }
        catch(e) {
            expect(e.message).toBe('Email does not match email patterns.');
        }
    });
    it('without anything after (.)', () => {
        try {
            new Email('email@email.');
            expect(true).toBe(false);
        }
        catch(e) {
            expect(e.message).toBe('Email does not match email patterns.');
        }
    });
});

