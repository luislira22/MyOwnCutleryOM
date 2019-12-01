import { Email } from '../../../src/models/clients/email'

test('Create a valid email', () => {
    Email.create('email@email.com')
})

describe('Create an invalid email', () => {
    it('without @', () => {
        try {
            Email.create('emailemail.com')
            expect(true).toBe(false)
        }
        catch(e) {
            expect(e.message).toBe('Email does not match email patterns.')
        }
    })
    it('without .', () => {
        try {
            Email.create('email@emailcom')
            expect(true).toBe(false)
        }
        catch(e) {
            expect(e.message).toBe('Email does not match email patterns.')
        }
    })
    it('without anything after (.)', () => {
        try {
            Email.create('email@email.')
            expect(true).toBe(false)
        }
        catch(e) {
            expect(e.message).toBe('Email does not match email patterns.')
        }
    })
})