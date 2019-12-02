import { Quantity } from '../../../src/models/orders/quantity';

test('Create a valid quantity', () => {
  let quantity = Quantity.create(200);
  expect(quantity.value).toBe(200);
});

describe('Create an invalid quantity', () => {
  it('null quantity', () => {
    try {
      Quantity.create(null);
      expect(true).toBe(false);
    } catch (e) {
      expect(e.message).toBe('Quantity shouldn\'t be null');
    }
  });
  it('negative quantity', () => {
    try {
      Quantity.create(-5);
      expect(true).toBe(false);
    } catch (e) {
      expect(e.message).toBe('Quantity shouldn\'t be a negative value');
    }
  });
});