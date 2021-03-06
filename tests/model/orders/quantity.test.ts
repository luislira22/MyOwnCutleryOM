import OrderQuantity from "../../../src/model/orders/OrderQuantity";

test('Create a valid quantity', () => {

  let quantity = new OrderQuantity(200);
  expect(quantity.quantity).toBe(200);
});

describe('Create an invalid quantity', () => {
  it('null quantity', () => {
    try {
        let quantity = new OrderQuantity(null);
      expect(true).toBe(false);
    } catch (e) {
      expect(e.message).toBe('OrderQuantity shouldn\'t be null');
    }
  });
  it('negative quantity', () => {
    try {
        let quantity = new OrderQuantity(-5);
      expect(true).toBe(false);
    } catch (e) {
      expect(e.message).toBe('OrderQuantity shouldn\'t be a negative value');
    }
  });
});

