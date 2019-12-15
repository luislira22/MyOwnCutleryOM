import Status from '../../../src/model/orders2/Status';
import {ValidStatus} from '../../../src/model/orders2/enums/ValidStatus'

test('Create an accepted status', () => {
    let status = new Status('ACCEPTED');
    expect(status.status).toBe(ValidStatus.Accepted);
});

test('Create a processing status', () => {
    let status = new Status('PROCESSING');
    expect(status.status).toBe(ValidStatus.Processing);
});

test('Create a completed status', () => {
    let status = new Status('COMPLETED');
    expect(status.status).toBe(ValidStatus.Completed);
});

test('Create a on hold status', () => {
    let status = new Status('ON_HOLD');
    expect(status.status).toBe(ValidStatus.On_Hold);
});

test('Create a cancelled status', () => {
    let status = new Status('CANCELLED');
    expect(status.status).toBe(ValidStatus.Cancelled);
});

test('Create an invalid status', () => {
    try {
        new Status('IN PROGRESS')
        expect(true).toBe(false)
    } catch (e) {
        expect(e.message).toBe('Should have 1 valid status')
    }
});

test('Create an invalid status', () => {
    try {
        new Status('');
    } catch (e) {
        expect(e.message).toBe('Status is empty')
    }
});

test('Create an invalid status', () => {
    try {
        new Status(null)
        expect(true).toBe(false)
    } catch (e) {
        expect(e.message).toBe('Cannot read property \'toUpperCase\' of null')
    }
});

