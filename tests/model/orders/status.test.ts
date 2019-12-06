/*
//TODO check enum problems and uncomment
import { Status, StatusMedia } from '../../../src/models/orders/status';
import { Address } from '../../../src/models/clients/address';

test('Create an accepted status', () => {
  let status = Status.create('ACCEPTED');
  expect(status.value).toBe(StatusMedia.Accepted);
});

test('Create a processing status', () => {
  let status = Status.create('PROCESSING');
  expect(status.value).toBe(StatusMedia.Processing);
});

test('Create a completed status', () => {
  let status = Status.create('COMPLETED');
  expect(status.value).toBe(StatusMedia.Completed);
});

test('Create an invalid status', () => {
    try {
      Status.create('IN PROGRESS')
      expect(true).toBe(false)
    }
    catch (e) {
      expect(e.message).toBe('Should have 1 valid status')
    }
});

test('Create an invalid status', () => {
    try {
      Status.create('')
      expect(true).toBe(false)
    }
    catch (e) {
      expect(e.message).toBe('Should have 1 valid status')
    }
});

test('Create an invalid status', () => {
    try {
      Status.create(null)
      expect(true).toBe(false)
    }
    catch (e) {
      expect(e.message).toBe('Should have 1 valid status')
    }
});



*/
